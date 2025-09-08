import { MergerOptions } from "./mergerOptions";
import { TextChunk } from "./textChunk";

// TODO: Implement options.headingOrder
// TODO: Implement options.date
// TODO: Implement options.indentSize

export class Merger {
    private options: MergerOptions;

    constructor(options: MergerOptions) {
        this.options = options;
    }

    mergeChunks(inputChunks: TextChunk[]): TextChunk[] {
        // TODO: Implement merging logic.
        throw new Error("Method not implemented.");
    }

    stringifyChunks(chunks: TextChunk[]): string {
        // TODO: Implement stringifying logic.
        throw new Error("Method not implemented.");
    }
}