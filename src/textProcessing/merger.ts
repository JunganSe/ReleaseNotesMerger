import { Deduplicator } from "./deduplicator";
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
        let uniqueHeadings = TextChunkHelper.getUniqueHeadings(inputChunks);

        if (this._options.headingOrder.length)
            SortBy.preferredOrder_CaseInsensitive(uniqueHeadings, this._options.headingOrder);

        if (this._options.ignoreHeadingCase)
            uniqueHeadings = Deduplicator.getCasingDeduplicatedStrings(uniqueHeadings, this._options.headingOrder);

        // TODO: If options.allowMisspelledHeadings is true, group similar headings together.
        //       (e.g. "Feature", "Features", "Feautres" -> "Features")
        //       If options.headingOrder contains a similar heading, use that.

        const outputChunks: TextChunk[] = uniqueHeadings.map(heading => ({ heading, content: [] }));

        const isCaseSensitive = !this._options.ignoreHeadingCase;
        inputChunks.forEach(inputChunk => TextChunkHelper.addContentToMatchingOutputChunk(inputChunk, outputChunks, isCaseSensitive));

        return outputChunks;
    }
}