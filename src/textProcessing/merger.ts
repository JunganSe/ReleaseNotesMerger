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

        // x Get all headings into an array
        // - Create an outputChunk for each heading
        // - Append inputContent to the correct outputChunk based on heading
        // - Return outputChunks
        const uniqueHeadings = this.getUniqueHeadings(inputChunks);
    }

    private getUniqueHeadings(chunks: TextChunk[]): string[] {
        const headings = chunks
            .map(chunk => chunk.heading)
            .filter(heading => heading != null);
        return [...new Set(headings)];
    }

    stringifyChunks(chunks: TextChunk[]): string {
        // TODO: Implement stringifying logic.
        // TODO: Implement options.date
        throw new Error("Method not implemented.");
    }
}