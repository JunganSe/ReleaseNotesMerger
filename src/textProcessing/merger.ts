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
            uniqueHeadings = this.getCasingDeduplicatedHeadings(uniqueHeadings, this._options.headingOrder);

        // TODO: If options.allowMisspelledHeadings is true, group similar headings together.
        //       (e.g. "Feature", "Features", "Feautres" -> "Features")
        //       If options.headingOrder contains a similar heading, use that.

        const outputChunks: TextChunk[] = uniqueHeadings.map(heading => ({ heading, content: [] }));

        const isCaseSensitive = !this._options.ignoreHeadingCase;
        inputChunks.forEach(inputChunk => TextChunkHelper.addContentToMatchingOutputChunk(inputChunk, outputChunks, isCaseSensitive));

        return outputChunks;
    }

    /** Returns an array of strings where versions that only differ by casing has been removed.
     *  Prefers versions found in the preferredHeadings parameter, then capitalized versions. */
    private getCasingDeduplicatedHeadings(headings: string[], preferredHeadings: string[]): string[] {
        const chosenHeadings = headings.map(heading => {
            const matchingHeadings = headings.filter(h => h.toLowerCase() === heading.toLowerCase());
            const preferredHeading = preferredHeadings.find(ph => matchingHeadings.some(h => h.toLowerCase() === ph.toLowerCase()));
            const firstCapitalizedHeading = matchingHeadings.find(h => h && h[0] === h[0].toUpperCase());
            return preferredHeading ?? firstCapitalizedHeading ?? heading;
        });
        const deduplicatedHeadings = new Set(chosenHeadings);
        return [...deduplicatedHeadings];
    }
}