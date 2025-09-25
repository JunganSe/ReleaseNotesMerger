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

        const preferredChunk = TextChunkHelper.getFirstChunkWithMatchingHeading_CaseInsensitive(matchingChunks, preferredHeadings);
        const firstChunkWithCapitalizedHeading = TextChunkHelper.getFirstChunkWithCapitalizedHeading(matchingChunks);

        const keeper = preferredChunk ?? firstChunkWithCapitalizedHeading ?? chunk;
        const goners = matchingChunks.filter(c => c !== keeper);

        this.moveContentToKeeper(keeper, goners);
    }

    private static moveContentToKeeper(keeper: TextChunk, goners: TextChunk[]): void {
        const gonersContent = goners.flatMap(goner => goner.content);
        keeper.content.push(...gonersContent);
        goners.forEach(goner => {
            goner.heading = null;
            goner.content = [];
        });
    }

    private static removeEmptyChunks(chunks: TextChunk[]): void {
        for (let i = chunks.length - 1; i >= 0; i--) {
            if (!chunks[i].heading || chunks[i].content.length === 0)
                chunks.splice(i, 1);
        }
    }
}