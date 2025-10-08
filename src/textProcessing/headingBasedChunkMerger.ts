import { TextChunk } from "./textChunk";
import { TextChunkHelper } from "./textChunkHelper";

export class HeadingBasedChunkMerger {
    /** Combines chunks with the same heading while ignoring casing.
     * Prefers versions found in headingOrder, then capitalized versions.
     * Mutates the chunks in the provided array.
     * @param chunks The chunks to process.
     * @param preferredHeadings Headings to prefer when choosing which chunk to keep.
    */
    static mergeAllChunksWithSameHeading_CaseInsensitive(chunks: TextChunk[], preferredHeadings: string[]): void {
        chunks.forEach(chunk => this.mergeChunksWithSameHeading_CaseInsensitive(chunk, chunks, preferredHeadings));
        this.removeEmptyChunks(chunks);
    }

    private static mergeChunksWithSameHeading_CaseInsensitive(chunk: TextChunk, chunks: TextChunk[], preferredHeadings: string[]): void {
        if (!chunk.heading || !chunk.content.length)
            return;

        const matchingChunks = TextChunkHelper.getChunksWithMatchingHeading_CaseInsensitive(chunks, chunk.heading);
        if (matchingChunks.length <= 1)
            return;

        const firstChunk = matchingChunks[0];
        const otherChunks = matchingChunks.slice(1);
        const preferredHeading = 'Temp preferred heading'; // TODO: Determine the preferred heading based on preferredHeadings.
        const capitalizedHeading = 'Temp capitalized heading'; // TODO: Determine the first capitalized heading, if any.
        const combinedContent = matchingChunks.flatMap(c => c.content);
        firstChunk.heading = preferredHeading ?? capitalizedHeading;
        firstChunk.content = combinedContent;
        otherChunks.forEach(c => { c.heading = null; c.content = []; });
    }

    private static removeEmptyChunks(chunks: TextChunk[]): void {
        for (let i = chunks.length - 1; i >= 0; i--) {
            if (!chunks[i].heading || chunks[i].content.length === 0)
                chunks.splice(i, 1);
        }
    }
}