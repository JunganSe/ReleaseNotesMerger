import { MergerOptions } from "../textProcessing/mergerOptions";
import { ParserOptions } from "../textProcessing/parserOptions";

export class HtmlReader {
    getInputText(): string {
        // TODO: Implement reading of textarea.
        throw new Error("Method not implemented.");
    }

    getParserOptions(): ParserOptions {
        return {
            ignoreCase: false, // TODO: Get ignoreCase from user input.
            trimWhitespace: false, // TODO: Get trimWhitespace from user input.
            forgiveMisspelledHeadings: false // TODO: Get forgiveMisspelledHeadings from user input.
        };
    }

    getMergerOptions(): MergerOptions {
        return {
            headingOrder: ['Nya funktioner', 'Uppdateringar', 'Bugfixar'], // TODO: Get headingOrder from user input.
            date: new Date(), // TODO: Get date from user input.
        };
    }
}