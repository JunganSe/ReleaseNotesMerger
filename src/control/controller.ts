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
            headingOrder: ['Nya funktioner', 'Uppdateringar', 'Bugfixar'], // TODO: Get headingOrder from user input.
            date: new Date(), // TODO: Get date from user input.
            ignoreCase: false, // TODO: Get ignoreCase from user input.
            trimWhitespace: false, // TODO: Get trimWhitespace from user input.
            forgiveMisspelledHeadings: false // TODO: Get forgiveMisspelledHeadings from user input.
        };
        this.parser = new Parser(parserOptions);
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