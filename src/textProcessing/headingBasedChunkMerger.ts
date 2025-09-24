import { TextChunk } from "./textChunk";

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

        const matchingChunks = this.getChunksWithMatchingHeading_CaseInsensitive(chunks, chunk.heading);
        if (matchingChunks.length <= 1)
            return;

        const preferredChunk = this.getFirstChunkWithMatchingHeading_CaseInsensitive(matchingChunks, preferredHeadings);
        const firstChunkWithCapitalizedHeading = this.getFirstChunkWithCapitalizedHeading(matchingChunks);

        const keeper = preferredChunk ?? firstChunkWithCapitalizedHeading ?? chunk;
        const goners = matchingChunks.filter(c => c !== keeper);

        this.moveContentToKeeper(keeper, goners);
    }

    private static getChunksWithMatchingHeading_CaseInsensitive(chunks: TextChunk[], heading: string): TextChunk[] {
        return chunks.filter(c => c.heading?.toLowerCase() === heading.toLowerCase());
    }

    private static getFirstChunkWithMatchingHeading_CaseInsensitive(chunks: TextChunk[], headings: string[]): TextChunk | undefined {
        return chunks.find(c => headings.some(h => h.toLowerCase() === c.heading?.toLowerCase()));
    }

    private static getFirstChunkWithCapitalizedHeading(chunks: TextChunk[]): TextChunk | undefined {
        return chunks.find(c => c.heading && c.heading[0] === c.heading[0].toUpperCase());
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