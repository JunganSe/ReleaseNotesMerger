import { HtmlReader } from "../io/htmlReader";
import { HtmlWriter } from "../io/htmlWriter";
import { Merger } from "../textProcessing/merger";
import { Parser } from "../textProcessing/parser";

export class Controller {
    private htmlReader: HtmlReader;
    private htmlWriter: HtmlWriter;
    private merger: Merger;

    constructor() {
        this.htmlReader = new HtmlReader();
        this.htmlWriter = new HtmlWriter();
        this.merger = new Merger();
    }

    initialize(): void {
        this.setButtonEvents();
    }

    private setButtonEvents(): void {
        document.getElementById('btn-merge')?.addEventListener('click', this.click_MergeButton);
        document.getElementById('btn-copy')?.addEventListener('click', this.click_CopyButton);
    }

    private click_MergeButton = (): void => {
        const inputText = this.htmlReader.getInputText();

        const parserOptions = this.htmlReader.getParserOptions();
        const parser = new Parser(parserOptions);
        const inputChunks = parser.chunkifyText(inputText);

        this.merger.options = this.htmlReader.getMergerOptions();
        const mergedChunks = this.merger.mergeChunks(inputChunks);

        const outputText = this.merger.stringifyChunks(mergedChunks);
        this.htmlWriter.writeOutputText(outputText);
    }

    private click_CopyButton = (): void => {
        // TODO: Implement copy to clipboard functionality.
        // - Get output text
        // - Copy to clipboard
        console.log('Copy button clicked.');
    }
}