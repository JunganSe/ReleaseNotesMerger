import { HtmlReader } from "../io/htmlReader";
import { HtmlWriter } from "../io/htmlWriter";
import { Merger } from "../textProcessing/merger";
import { Parser } from "../textProcessing/parser";

export class Controller {
    initialize(): void {
        this.setButtonEvents();
    }

    private setButtonEvents(): void {
        document.getElementById('btn-merge')?.addEventListener('click', this.click_MergeButton);
        document.getElementById('btn-copy')?.addEventListener('click', this.click_CopyButton);
    }

    private click_MergeButton = (): void => {
        const htmlReader = new HtmlReader();
        const inputText = htmlReader.getInputText();

        const parserOptions = htmlReader.getParserOptions();
        const parser = new Parser(parserOptions);
        const inputChunks = parser.chunkifyText(inputText);

        const mergerOptions = htmlReader.getMergerOptions();
        const merger = new Merger(mergerOptions);
        const mergedChunks = merger.mergeChunks(inputChunks);
        const outputText = merger.stringifyChunks(mergedChunks);

        const htmlWriter = new HtmlWriter();
        htmlWriter.writeOutputText(outputText);
    }

    private click_CopyButton = (): void => {
        // TODO: Implement copy to clipboard functionality.
        // - Get output text
        // - Copy to clipboard
        console.log('Copy button clicked.');
    }
}