import { ParserOptions } from "./parserOptions";
import { textChunk } from "./textChunk";

// TODO: Implement options.ignoreCase
// TODO: Implement options.trimWhitespace
// TODO: Implement options.forgiveMisspelledHeadings

export class Parser {
    private options: ParserOptions;

    constructor(options: ParserOptions) {
        this.options = options;
    }

    chunkifyText(input: string): textChunk[] {
        // TODO: Implement parsing logic.
        // - Divide into chunks based on empty lines.
        // - Find headings in each chunk. Should be the first line.
        // - Store everything else as content, one string per line.
        throw new Error("Method not implemented.");
    }
}