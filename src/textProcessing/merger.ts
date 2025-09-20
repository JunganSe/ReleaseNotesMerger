import { MergerOptions } from "./mergerOptions";
import { CompareBy } from "./comparers";
import { TextChunk } from "./textChunk";
import { SortBy } from "./sorting";

export class Merger {
    private _options: MergerOptions;

    constructor(options: MergerOptions) {
        this._options = options;
    }

    mergeChunks(inputChunks: TextChunk[]): TextChunk[] {
        const uniqueHeadings = this.getUniqueHeadings(inputChunks);

        if (this._options.headingOrder.length)
            SortBy.preferredOrder(uniqueHeadings, this._options.headingOrder);

        const outputChunks: TextChunk[] = uniqueHeadings.map(heading => ({ heading, content: [] }));
        inputChunks.forEach(inputChunk => this.addContentToMatchingOutputChunk(inputChunk, outputChunks));

        // TODO: If options.ignoreHeadingCase is true, remove duplicates that differ only by case and move the content to the one being kept. (Prefer Capitalized versions.)
        // TODO: If options.allowMisspelledHeadings is true, group similar headings together.
        //       (e.g. "Feature", "Features", "Feautres" -> "Features")
        //       If options.headingOrder contains a similar heading, use that.
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