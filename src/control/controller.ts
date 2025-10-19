import { ClipboardHandler } from "../io/clipboardHandler";
import { HtmlElementClass, HtmlElementId } from "../io/htmlElementSelectors";
import { HtmlReader } from "../io/htmlReader";
import { HtmlWriter } from "../io/htmlWriter";
import { StorageHandler } from "../io/storageHandler";
import { Merger } from "../textProcessing/merger";
import { Parser } from "../textProcessing/parser";
import { Stringifier } from "../textProcessing/stringifier";

export class Controller {
    initialize(): void {
        this.applyOptionsFromStorage();
        HtmlWriter.setDateInputToToday();
        this.setEvents();
    }

    private applyOptionsFromStorage(): void {
        const options = StorageHandler.load();
        if (options)
            HtmlWriter.applyOptions(options);
    }

    private saveOptionsToStorage(): void {
        const options = HtmlReader.getOptions();
        StorageHandler.save(options);
    }

    private clearOptionsInStorage(): void {
        StorageHandler.clear();
    }

    private setEvents(): void {
        document.getElementById(HtmlElementId.SaveOptionsButton)?.addEventListener('click', this.saveOptionsToStorage);
        document.getElementById(HtmlElementId.LoadOptionsButton)?.addEventListener('click', this.applyOptionsFromStorage);
        document.getElementById(HtmlElementId.ClearOptionsButton)?.addEventListener('click', this.clearOptionsInStorage);

        document.getElementById(HtmlElementId.MergeButton)?.addEventListener('click', this.mergeInput);
        document.getElementById(HtmlElementId.CopyButton)?.addEventListener('click', this.copyOutputToClipboard);
        document.querySelectorAll<HTMLElement>(`#${HtmlElementId.InputTextarea}, .${HtmlElementClass.OptionsContainer} input`)
            .forEach(element => element.addEventListener('keydown', this.triggerMergeOnCtrlEnter));

        document.getElementById(HtmlElementId.OutputTextarea)?.addEventListener('change', this.hideCopyOkIcon);

        this.rememberOptionsAccordionState();
    }

    private rememberOptionsAccordionState(): void {
        // TODO: Refactor.

        const accordion = document.querySelector('.options-accordion');
        if (!(accordion instanceof HTMLDetailsElement))
            return;

        // Restore saved state on page load
        const savedState = localStorage.getItem('optionsAccordionOpen');
        if (savedState === 'true') {
            accordion.setAttribute('open', '');
        }

        // Save state when toggled
        accordion.addEventListener('toggle', () => {
            if (accordion.open) {
                localStorage.setItem('optionsAccordionOpen', 'true');
            } else {
                localStorage.removeItem('optionsAccordionOpen');
            }
        });
    }

    private mergeInput = (): void => {
        // Initialize workers
        const parser = new Parser(HtmlReader.getParserOptions());
        const merger = new Merger(HtmlReader.getMergerOptions());
        const stringifier = new Stringifier(HtmlReader.getStringifierOptions());

        // Process text
        const inputText = HtmlReader.getInputText();
        const inputChunks = parser.parseTextChunks(inputText);
        const mergedChunks = merger.mergeChunks(inputChunks);
        const outputText = stringifier.getStringifiedOutput(mergedChunks);
        HtmlWriter.writeOutputText(outputText);

        this.hideCopyOkIcon();
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

    private triggerMergeOnCtrlEnter = (event: KeyboardEvent): void => {
        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            this.mergeInput();
        }
    }

    private hideCopyOkIcon = (): void => {
        HtmlWriter.setCopyOkIconVisibility(false);
    }
}