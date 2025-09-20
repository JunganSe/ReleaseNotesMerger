import { ClipboardHandler } from "../io/clipboardHandler";
import { HtmlElementId } from "../io/constants";
import { HtmlReader } from "../io/htmlReader";
import { HtmlWriter } from "../io/htmlWriter";
import { Merger } from "../textProcessing/merger";
import { Parser } from "../textProcessing/parser";
import { Stringifier } from "../textProcessing/stringifier";

// TODO: Trigger merge button on ctrl+enter keypress in input textarea.
// TODO: Save all options in localstorage and load them on startup.
// TODO: Checkbox to save options in localstorage.
// TODO: Button to reset options to default values?

export class Controller {
    initialize(): void {
        HtmlWriter.setDateInputToToday();
        this.setEvents();
    }

    private setEvents(): void {
        document.getElementById(HtmlElementId.MergeButton)?.addEventListener('click', this.onClick_MergeButton);
        document.getElementById(HtmlElementId.CopyButton)?.addEventListener('click', this.onClick_CopyButton);
        document.getElementById(HtmlElementId.OutputTextarea)?.addEventListener('change', this.onChange_OutputText);
    }

    private onClick_MergeButton = (): void => {
        // Initialize workers
        const mergerOptions = HtmlReader.getMergerOptions();
        const merger = new Merger(mergerOptions);
        const stringifierOptions = HtmlReader.getStringifierOptions();
        const stringifier = new Stringifier(stringifierOptions);

        // Process text
        const inputText = HtmlReader.getInputText();
        const inputChunks = Parser.chunkifyText(inputText);
        const mergedChunks = merger.mergeChunks(inputChunks);
        const outputText = stringifier.getStringifiedOutput(mergedChunks);
        HtmlWriter.writeOutputText(outputText);

        this.triggerEvent_OutputText_Changed();
    }

    private onClick_CopyButton = (): void => {
        const outputText = HtmlReader.getOutputText();
        if (!outputText)
            return;

        ClipboardHandler.copyToClipboard(outputText)
            .then((isSuccess) => {
                if (isSuccess) {
                    HtmlWriter.setCopyOkIconVisibility(true);
                    console.log('Copied output text to clipboard.');
                }
            });
    }

    private onChange_OutputText = (): void => {
        HtmlWriter.setCopyOkIconVisibility(false);
    }

    private triggerEvent_OutputText_Changed(): void {
        const element = document.getElementById(HtmlElementId.OutputTextarea);
        if (element) {
            const event = new Event('change', { bubbles: true });
            element.dispatchEvent(event);
        }
    }
}