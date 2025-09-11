import { MergerOptions } from "./mergerOptions";
import { TextChunk } from "./textChunk";

export class Merger {
    private options: MergerOptions;

    constructor(options: MergerOptions) {
        this.options = options;
    }

    mergeChunks(inputChunks: TextChunk[]): TextChunk[] {
        // TODO: Implement merging logic.
        // TODO: Implement options.indentSize

        // x Get all headings into an array
        // - Create an outputChunk for each heading
        // - Append inputContent to the correct outputChunk based on heading
        // - Return outputChunks
        const uniqueHeadings = this.getUniqueHeadings(inputChunks);
        // TODO: If options.ignoreHeadingCase is true, remove duplicates that differ only by case. (Prefer Capitalized versions.)
        // TODO: If options.allowMisspelledHeadings is true, group similar headings together.
        //       (e.g. "Feature", "Features", "Feautres" -> "Features")
        //       If options.headingOrder contains a similar heading, use that.
        // TODO: Order uniqueHeadings according to options.headingOrder
        
        const outputChunks: TextChunk[] = uniqueHeadings.map(heading => ({ heading, content: [] }));

        inputChunks.forEach(inputChunk =>
            this.addContentToMatchingChunk(inputChunk, outputChunks));

        return outputChunks;
    }

    private getUniqueHeadings(chunks: TextChunk[]): string[] {
        const headings = chunks
            .map(chunk => chunk.heading)
            .filter(heading => heading != null);
        return [...new Set(headings)];
    }

    private addContentToMatchingChunk(inputChunk: TextChunk, outputChunks: TextChunk[]): void {
        const outputChunk = outputChunks.find(chunk => chunk.heading === inputChunk.heading);
        outputChunk?.content.push(...inputChunk.content);
    }

    stringifyChunks(chunks: TextChunk[]): string {
        // TODO: Implement stringifying logic.
        // TODO: Implement options.date
        throw new Error("Method not implemented.");
    }
}