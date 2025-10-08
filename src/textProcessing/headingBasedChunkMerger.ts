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
        firstChunk.heading = this.getPreferredHeading(matchingChunks, preferredHeadings) ?? firstChunk.heading;
        firstChunk.content = matchingChunks.flatMap(c => c.content);
        otherChunks.forEach(c => { c.heading = null; c.content = []; });
    }

    private static getPreferredHeading(chunks: TextChunk[], preferredHeadings: string[]): string | null {
        const chunkHeadings = chunks.map(c => c.heading).filter(h => h != null);
        const preferredHeading = preferredHeadings.find(ph => chunkHeadings.some(ch => ch.toLowerCase() === ph.toLowerCase()));
        if (preferredHeading)
            return preferredHeading;

        const firstCapitalizedHeading = chunkHeadings.find(ch => ch && ch[0] === ch[0].toUpperCase());
        if (firstCapitalizedHeading)
            return firstCapitalizedHeading;

        return null;
    }

    private static removeEmptyChunks(chunks: TextChunk[]): void {
        for (let i = chunks.length - 1; i >= 0; i--) {
            if (!chunks[i].heading || chunks[i].content.length === 0)
                chunks.splice(i, 1);
        }
    }
}