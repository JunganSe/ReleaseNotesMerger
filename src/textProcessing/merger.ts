import { HeadingBasedChunkMerger } from "./headingBasedChunkMerger";
import { MergerOptions } from "./mergerOptions";
import { SortBy } from "./sorting";
import { TextChunk } from "./textChunk";
import { TextChunkHelper } from "./textChunkHelper";

export class Merger {
    private _options: MergerOptions;

    constructor(options: MergerOptions) {
        this._options = options;
    }

    mergeChunks(inputChunks: TextChunk[]): TextChunk[] {
        const uniqueHeadings = TextChunkHelper.getUniqueHeadings(inputChunks);

        if (this._options.headingOrder.length)
            SortBy.preferredOrder_CaseInsensitive(uniqueHeadings, this._options.headingOrder);

        const outputChunks: TextChunk[] = uniqueHeadings.map(heading => ({ heading, content: [] }));
        inputChunks.forEach(inputChunk => this.addContentToMatchingOutputChunk(inputChunk, outputChunks));

        if (this._options.ignoreHeadingCase)
            HeadingBasedChunkMerger.mergeAllChunksWithSameHeading_CaseInsensitive(outputChunks, this._options.headingOrder);

        // TODO: If options.allowMisspelledHeadings is true, group similar headings together.
        //       (e.g. "Feature", "Features", "Feautres" -> "Features")
        //       If options.headingOrder contains a similar heading, use that.

        return outputChunks.filter(chunk => chunk.heading && chunk.content.length > 0);
    }

    private addContentToMatchingOutputChunk(inputChunk: TextChunk, outputChunks: TextChunk[]): void {
        const outputChunk = outputChunks.find(chunk => chunk.heading === inputChunk.heading);
        outputChunk?.content.push(...inputChunk.content);
    }
}