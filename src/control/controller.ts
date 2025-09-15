import { HtmlElementId } from "../io/constants";
import { HtmlReader } from "../io/htmlReader";
import { HtmlWriter } from "../io/htmlWriter";
import { Merger } from "../textProcessing/merger";
import { Parser } from "../textProcessing/parser";
import { Stringifier } from "../textProcessing/stringifier";

export class Controller {
    initialize(): void {
        const htmlWriter = new HtmlWriter();

        htmlWriter.setDateInputToToday();
        this.setButtonEvents();
    }

    private setButtonEvents(): void {
        document.getElementById(HtmlElementId.MergeButton)?.addEventListener('click', this.click_MergeButton);
        document.getElementById(HtmlElementId.CopyButton)?.addEventListener('click', this.click_CopyButton);
    }

    private click_MergeButton = (): void => {
        // Initialize workers
        const htmlReader = new HtmlReader();
        const parser = new Parser();
        const mergerOptions = htmlReader.getMergerOptions();
        const merger = new Merger(mergerOptions);
        const stringifierOptions = htmlReader.getStringifierOptions();
        const stringifier = new Stringifier(stringifierOptions);
        const htmlWriter = new HtmlWriter();

        // Process text
        const inputText = htmlReader.getInputText();
        const inputChunks = parser.chunkifyText(inputText);
        const mergedChunks = merger.mergeChunks(inputChunks);
        const outputText = stringifier.getStringifiedOutput(mergedChunks);
        htmlWriter.writeOutputText(outputText);
    }

    private click_CopyButton = (): void => {
        const htmlReader = new HtmlReader();
        const clipboardHandler = new ClipboardHandler(); // TODO: Create and implement ClipboardHandler.

        const outputText = htmlReader.getOutputText();
        clipboardHandler.copyToClipboard(outputText);
    }
}