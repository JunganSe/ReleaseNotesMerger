import { MergerOptions } from "../options/mergerOptions";
import { Deduplicator } from "./deduplicator";
import { SortBy } from "./sorting";
import { TextChunk } from "./textChunk";
import { TextChunkHelper } from "./textChunkHelper";

export class Merger {
    private _options: MergerOptions;

    constructor(options: MergerOptions) {
        this._options = options;
    }

    mergeChunks(inputChunks: TextChunk[]): TextChunk[] {
        let headings = TextChunkHelper.getUniqueHeadings(inputChunks);

        if (this._options.headingOrder.length)
            SortBy.preferredOrder_CaseInsensitive(headings, this._options.headingOrder);

        if (this._options.ignoreHeadingCase)
            headings = Deduplicator.getCasingDeduplicatedStrings(headings, this._options.headingOrder);

        const outputChunks: TextChunk[] = headings.map(heading => ({ heading, content: [] }));

        const isCaseSensitive = !this._options.ignoreHeadingCase;
        inputChunks.forEach(inputChunk => TextChunkHelper.addContentToMatchingOutputChunk(inputChunk, outputChunks, isCaseSensitive));

        if (this._options.indentMultiplier >= 0)
            TextChunkHelper.applyIndentMultiplier(outputChunks, this._options.indentMultiplier);

        return outputChunks;
    }
}