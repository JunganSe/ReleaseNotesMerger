import { HtmlReader } from "../io/htmlReader";
import { HtmlWriter } from "../io/htmlWriter";
import { Parser } from "../textProcessing/parser";

export class Controller {
    private parser: Parser;
    private htmlReader: HtmlReader;
    private htmlWriter: HtmlWriter;

    constructor() {
        this.parser = new Parser();
        this.htmlReader = new HtmlReader();
        this.htmlWriter = new HtmlWriter();
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