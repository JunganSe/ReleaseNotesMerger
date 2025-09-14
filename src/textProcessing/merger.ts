import { MergerOptions } from "./mergerOptions";
import { TextChunk } from "./textChunk";

export class Merger {
    private options: MergerOptions;

    constructor(options: MergerOptions) {
        this.options = options;
    }

    mergeChunks(inputChunks: TextChunk[]): TextChunk[] {
        const uniqueHeadings = this.getUniqueHeadings(inputChunks);
        const outputChunks: TextChunk[] = uniqueHeadings.map(heading => ({ heading, content: [] }));
        inputChunks.forEach(inputChunk => this.addContentToMatchingOutputChunk(inputChunk, outputChunks));

        // TODO: If options.ignoreHeadingCase is true, remove duplicates that differ only by case and move the content to the one being kept. (Prefer Capitalized versions.)
        // TODO: If options.allowMisspelledHeadings is true, group similar headings together.
        //       (e.g. "Feature", "Features", "Feautres" -> "Features")
        //       If options.headingOrder contains a similar heading, use that.
        // TODO: Order uniqueHeadings according to options.headingOrder
        // TODO: Implement options.indentSize

        return outputChunks;
    }

    private getUniqueHeadings(chunks: TextChunk[]): string[] {
        const headings = chunks
            .map(chunk => chunk.heading)
            .filter(heading => heading != null);
        return [...new Set(headings)];
    }

    private addContentToMatchingOutputChunk(inputChunk: TextChunk, outputChunks: TextChunk[]): void {
        const outputChunk = outputChunks.find(chunk => chunk.heading === inputChunk.heading);
        outputChunk?.content.push(...inputChunk.content);
    }
}