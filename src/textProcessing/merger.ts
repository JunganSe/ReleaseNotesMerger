import { MergerOptions } from "./mergerOptions";
import { textChunk } from "./textChunk";

// TODO: Implement options.headingOrder
// TODO: Implement options.date
// TODO: Implement options.indentSize

export class Merger {
    private options: MergerOptions;

    constructor(options: MergerOptions) {
        this.options = options;
    }

    mergeChunks(inputChunks: textChunk[]): textChunk[] {
        // TODO: Implement merging logic.
        throw new Error("Method not implemented.");
    }

    stringifyChunks(chunks: textChunk[]): string {
        // TODO: Implement stringifying logic.
        throw new Error("Method not implemented.");
    }
}