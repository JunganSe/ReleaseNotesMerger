import { MergerOptions } from "./mergerOptions";
import { TextChunk } from "./textChunk";

export class Merger {
    private options: MergerOptions;

    constructor(options: MergerOptions) {
        this.options = options;
    }

    mergeChunks(inputChunks: TextChunk[]): TextChunk[] {
        // TODO: Implement merging logic.
        // TODO: Implement options.headingOrder
        // TODO: Implement options.indentSize
        // TODO: Implement options.ignoreHeadingCase
        // TODO: Implement options.allowMisspelledHeadings
        throw new Error("Method not implemented.");
    }

    stringifyChunks(chunks: TextChunk[]): string {
        // TODO: Implement stringifying logic.
        // TODO: Implement options.date
        throw new Error("Method not implemented.");
    }
}