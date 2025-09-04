import { MergerOptions } from "./mergerOptions";
import { textChunk } from "./textChunk";

export class Merger {
    options: MergerOptions;

    constructor() {
        this.options = this.getDefaultOptions();
    }

    private getDefaultOptions(): MergerOptions {
        return {
            headingOrder: [],
            date: undefined
        }
    }

    mergeChunks(inputChunks: textChunk[]): textChunk[] {
        // TODO: Implement merging logic.
        throw new Error("Method not implemented.");
    }
}