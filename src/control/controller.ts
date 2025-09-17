import { ClipboardHandler } from "../io/clipboardHandler";
import { HtmlElementId } from "../io/constants";
import { HtmlReader } from "../io/htmlReader";
import { HtmlWriter } from "../io/htmlWriter";
import { Merger } from "../textProcessing/merger";
import { Parser } from "../textProcessing/parser";
import { Stringifier } from "../textProcessing/stringifier";

export class Controller {
    initialize(): void {
        HtmlWriter.setDateInputToToday();
        this.setButtonEvents();
    }

    private setButtonEvents(): void {
        document.getElementById(HtmlElementId.MergeButton)?.addEventListener('click', this.click_MergeButton);
        document.getElementById(HtmlElementId.CopyButton)?.addEventListener('click', this.click_CopyButton);
        document.getElementById(HtmlElementId.OutputTextarea)?.addEventListener('change', this.change_OutputText);
    }

    private click_MergeButton = (): void => {
        // Initialize workers
        const parser = new Parser();
        const mergerOptions = HtmlReader.getMergerOptions();
        const merger = new Merger(mergerOptions);
        const stringifierOptions = HtmlReader.getStringifierOptions();
        const stringifier = new Stringifier(stringifierOptions);

        // Process text
        const inputText = HtmlReader.getInputText();
        const inputChunks = parser.chunkifyText(inputText);
        const mergedChunks = merger.mergeChunks(inputChunks);
        const outputText = stringifier.getStringifiedOutput(mergedChunks);
        HtmlWriter.writeOutputText(outputText);

        // TODO: Improve event triggering.
        const element = document.getElementById(HtmlElementId.OutputTextarea);
        if (element) {
            const event = new Event("change", { bubbles: true });
            element.dispatchEvent(event);
        }
    }

    private click_CopyButton = (): void => {
        const clipboardHandler = new ClipboardHandler();

        const outputText = HtmlReader.getOutputText();
        if (!outputText)
            return;

        clipboardHandler.copyToClipboard(outputText).then((isSuccess) => {
            if (isSuccess) {
                HtmlWriter.setCopyOkIconVisibility(true);
                console.log('Copied output text to clipboard.');
            }
        });
    }

    private change_OutputText = (): void => {
        HtmlWriter.setCopyOkIconVisibility(false);
    }
}