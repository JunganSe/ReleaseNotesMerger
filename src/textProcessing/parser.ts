import { ParserOptions } from "./parserOptions";
import { textChunk } from "./textChunk";

// TODO: Implement options.ignoreCase
// TODO: Implement options.trimWhitespace
// TODO: Implement options.forgiveMisspelledHeadings

export class Parser {
    options: ParserOptions = new ParserOptions();

    chunkifyText(input: string): textChunk[] {
        // TODO: Implement parsing logic.
        throw new Error("Method not implemented.");
    }
}