import { MergerOptions } from "./mergerOptions";
import { SortBy } from "./sorting";
import { TextChunk } from "./textChunk";

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

        if (this._options.ignoreHeadingCase)
            this.mergeAllChunksWithSameHeading_CaseInsensitive(outputChunks);

        // TODO: If options.allowMisspelledHeadings is true, group similar headings together.
        //       (e.g. "Feature", "Features", "Feautres" -> "Features")
        //       If options.headingOrder contains a similar heading, use that.

        return outputChunks.filter(chunk => chunk.heading && chunk.content.length > 0);
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

    // Mutates the provided chunks array.
    private mergeAllChunksWithSameHeading_CaseInsensitive(chunks: TextChunk[]): void {
        chunks.forEach(chunk => this.mergeChunksWithSameHeading_CaseInsensitive(chunk, chunks));
    }

    // Combine chunks with same heading but different casing, if ignoreHeadingCase is true.
    // Prefer versions in headingOrder, then prefer capitalized versions, then prefer the first one.
    // TODO: Improve and refactor.
    //       Handle cases where there are more than two chunks with same heading but different casing.
    //       Optimize performance.
    private mergeChunksWithSameHeading_CaseInsensitive(chunk: TextChunk, chunks: TextChunk[]): void {
        if (!chunk.heading || !chunk.content.length)
            return;

        const matchingChunks = this.getOtherChunksWithSameHeading_CaseInsensitive(chunk, chunks);
        if (!matchingChunks.length)
            return;

        const allMatchingChunks = [chunk, ...matchingChunks];

        const firstChunkWithHeadingInPreferredList = allMatchingChunks.find(c =>
            this._options.headingOrder.some(h => h.toLowerCase() === c.heading?.toLowerCase()));

        const firstChunkWithCapitalizedHeading = allMatchingChunks.find(c =>
            c.heading && c.heading[0] === c.heading[0].toUpperCase());

        let keeper = firstChunkWithHeadingInPreferredList ?? firstChunkWithCapitalizedHeading ?? chunk;
        const goners = allMatchingChunks.filter(c => c !== keeper);

        // Move contents from goners to keeper, and clear goners' content.
        goners.forEach(goner => {
            keeper.content.push(...goner.content);
            goner.content = [];
        });
    }

    private getOtherChunksWithSameHeading_CaseInsensitive(chunk: TextChunk, chunks: TextChunk[]): TextChunk[] {
        return chunks.filter(c =>
            c !== chunk
            && c.heading?.toLowerCase() === chunk.heading?.toLowerCase());
    }
}