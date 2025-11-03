import { ClipboardHandler } from "../io/clipboardHandler";
import { HtmlElementClass, HtmlElementId } from "../io/htmlElementSelectors";
import { HtmlReader } from "../io/htmlReader";
import { HtmlWriter } from "../io/htmlWriter";
import { StorageHandler } from "../io/storageHandler";
import { Merger } from "../textProcessing/merger";
import { Parser } from "../textProcessing/parser";
import { Stringifier } from "../textProcessing/stringifier";
import { Events } from "./events";

export class Controller {
    initialize(): void {
        Events.applyOptionsFromStorage();
        this.setEvents();
        this.rememberOptionsAccordionState();
    }

    private setEvents(): void {
        document.getElementById(HtmlElementId.SaveOptionsButton)?.addEventListener('click', Events.saveOptionsToStorage);
        document.getElementById(HtmlElementId.LoadOptionsButton)?.addEventListener('click', Events.applyOptionsFromStorage);
        document.getElementById(HtmlElementId.ClearOptionsButton)?.addEventListener('click', Events.clearOptions);

        document.getElementById(HtmlElementId.MergeButton)?.addEventListener('click', this.mergeInput);
        document.getElementById(HtmlElementId.CopyButton)?.addEventListener('click', this.copyOutputToClipboard);
        document.querySelectorAll<HTMLElement>(`#${HtmlElementId.InputTextarea}, .${HtmlElementClass.OptionsContainer} input`)
            .forEach(element => element.addEventListener('keydown', (event) => Events.triggerCallbackOnCtrlEnter(event, this.mergeInput)));
    }

    private rememberOptionsAccordionState(): void {
        const accordion = document.getElementsByClassName(HtmlElementClass.OptionsAccordion).item(0);
        if (!(accordion instanceof HTMLDetailsElement))
            return;

        // Apply saved state.
        const isOpen = StorageHandler.loadOptionsAccordionState() ?? false;
        accordion.toggleAttribute('open', isOpen);

        // Save state when toggled.
        accordion.addEventListener('toggle', () => {
            StorageHandler.saveOptionsAccordionState(accordion.open);
        });
    }

    private mergeInput = (): void => {
        // Initialize workers.
        const parser = new Parser(HtmlReader.getParserOptions());
        const merger = new Merger(HtmlReader.getMergerOptions());
        const stringifier = new Stringifier(HtmlReader.getStringifierOptions());

        // Process text.
        const inputText = HtmlReader.getInputText();
        const inputChunks = parser.parseTextChunks(inputText);
        const mergedChunks = merger.mergeChunks(inputChunks);
        const outputText = stringifier.getStringifiedOutput(mergedChunks);
        HtmlWriter.setOutputText(outputText);

        // Handle text copying.
        HtmlWriter.setCopyOkIconVisibility(false);
        if (HtmlReader.getCopyOnMerge())
            this.copyOutputToClipboard();
    }

    private copyOutputToClipboard = (): void => {
        const outputText = HtmlReader.getOutputText();
        if (!outputText)
            return;

        ClipboardHandler.tryCopyToClipboard(outputText)
            .then((isSuccess) => {
                if (isSuccess) {
                    HtmlWriter.setCopyOkIconVisibility(true);
                    console.log('Copied output text to clipboard.');
                }
            });
    }
}