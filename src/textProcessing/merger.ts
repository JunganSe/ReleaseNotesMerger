import { MergerOptions } from "./mergerOptions";
import { textChunk } from "./textChunk";

// TODO: Implement options.headingOrder
// TODO: Implement options.date
// TODO: Implement options.indentSize

export class Merger {
    options: MergerOptions;

    constructor() {
        this.options = this.getDefaultOptions();
    }

    private getDefaultOptions(): MergerOptions {
        return {
            date: undefined,
            headingOrder: [],
            indentSize: 4,
        }
    }

    mergeChunks(inputChunks: textChunk[]): textChunk[] {
        // TODO: Implement merging logic.
        throw new Error("Method not implemented.");
    }
}