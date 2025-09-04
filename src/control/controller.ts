import { HtmlReader } from "../io/htmlReader";
import { MergerOptions } from "../textProcessing/mergerOptions";
import { Parser } from "../textProcessing/parser";
import { ParserOptions } from "../textProcessing/parserOptions";

export class Controller {
    private parser: Parser | undefined;
    private htmlReader: HtmlReader;

    constructor() {
        this.htmlReader = new HtmlReader();
    }

    initialize(): void {
        this.setButtonEvents();
    }

    private setButtonEvents(): void {
        document.getElementById('btn-merge')?.addEventListener('click', this.click_MergeButton);
        document.getElementById('btn-copy')?.addEventListener('click', this.click_CopyButton);
    }

    private click_MergeButton(): void {
        // TODO: Implement merge functionality.
        // - Set parser options
        // - Get input text
        // - Parse input text into chunks
        // - Merge chunks
        // - Output merged text
        console.log('Merge button clicked.');
    }

    private click_CopyButton() {
        // TODO: Implement copy to clipboard functionality.
        // - Get output text
        // - Copy to clipboard
        console.log('Copy button clicked.');
    }
}