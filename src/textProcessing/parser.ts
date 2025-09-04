import { ParserOptions } from "./parserOptions";
import { textChunk } from "./textChunk";

// TODO: Implement options.ignoreCase
// TODO: Implement options.trimWhitespace
// TODO: Implement options.forgiveMisspelledHeadings

export class Parser {
    options: ParserOptions;

    constructor() {
        this.options = this.getDefaultOptions();
    }

    private getDefaultOptions(): ParserOptions {
        return {
            ignoreCase: false,
            trimWhitespace: false,
            forgiveMisspelledHeadings: false
        };
    }

    chunkifyText(input: string): textChunk[] {
        // TODO: Implement parsing logic.
        throw new Error("Method not implemented.");
    }
}