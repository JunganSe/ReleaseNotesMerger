import { Parser } from "../parsing/parser";
import { ParserOptions } from "../parsing/parserOptions";

export class Controller {
    private parser: Parser | undefined;

    initialize(): void {
        this.initializeParser();
        this.setButtonEvents();
    }

    private initializeParser(): void {
        const parserOptions: ParserOptions = {
            headingOrder: [],
            date: undefined,
            ignoreCase: false,
            trimWhitespace: false,
            forgiveMisspelledHeadings: false
        };
        this.parser = new Parser(parserOptions);
    }

    private setButtonEvents(): void {
        document.getElementById('btn-merge')?.addEventListener('click', this.click_MergeButton);
        document.getElementById('btn-copy')?.addEventListener('click', this.click_CopyButton);
    }

    private click_MergeButton(): void {
        // TODO: Implement merge functionality.
        console.log('Merge button clicked.');
    }

    private click_CopyButton() {
        // TODO: Implement copy to clipboard functionality.
        console.log('Copy button clicked.');
    }
}