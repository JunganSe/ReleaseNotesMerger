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
            this.mergeChunksWithSameHeading_CaseInsensitive(outputChunks);

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

    // Combine chunks with same heading but different casing, if ignoreHeadingCase is true.
    // Prefer versions in headingOrder, then prefer capitalized versions, then prefer the first one.
    // TODO: Improve and refactor.
    //       Handle cases where there are more than two chunks with same heading but different casing.
    //       Optimize performance.
    private mergeChunksWithSameHeading_CaseInsensitive(chunks: TextChunk[]): TextChunk[] {
        const outputChunks: TextChunk[] = [];
        chunks.forEach(chunk => {
            if (!chunk.heading || !chunk.content.length)
                return;

            const matchingChunks = this.getOtherChunksWithSameHeading_CaseInsensitive(chunk, chunks);
            if (!matchingChunks.length)
                return;

            // const matchingChunk = outputChunks.find(c => c !== chunk && c.heading?.toLowerCase() === chunk.heading?.toLowerCase());
            
            // const isChunkCapitalized = (chunk.heading && chunk.heading[0] === chunk.heading[0].toUpperCase());
            // const isMatchingChunkCapitalized = (matchingChunk.heading && matchingChunk.heading[0] === matchingChunk.heading[0].toUpperCase());
            // const isChunkInHeadingOrder = this._options.headingOrder.length > 0
            //     && this._options.headingOrder.some(h => h.toLowerCase() === chunk.heading?.toLowerCase());
            // const isMatchingChunkInHeadingOrder = this._options.headingOrder.length > 0
            //     && this._options.headingOrder.some(h => h.toLowerCase() === matchingChunk.heading?.toLowerCase());

            // const keeper = (isChunkInHeadingOrder)
            //     ? chunk
            //     : (isMatchingChunkInHeadingOrder)
            //         ? matchingChunk
            //         : (isChunkCapitalized)
            //             ? chunk
            //             : (isMatchingChunkCapitalized)
            //                 ? matchingChunk
            //                 : chunk;
            // const goner = (keeper === chunk)
            //     ? matchingChunk
            //     : chunk;

            // keeper.content.push(...goner.content);
            // goner.content = [];
        });
        return outputChunks;
    }

    private getOtherChunksWithSameHeading_CaseInsensitive(chunk: TextChunk, chunks: TextChunk[]): TextChunk[] {
        return chunks.filter(c =>
            c !== chunk
            && c.heading?.toLowerCase() === chunk.heading?.toLowerCase());
    }
}