import { TextChunk } from "./textChunk";

export class TextChunkHelper {
    static getUniqueHeadings(chunks: TextChunk[]): string[] {
        const headings = chunks
            .map(chunk => chunk.heading)
            .filter(heading => heading != null);
        return [...new Set(headings)];
    }

    static getChunksWithMatchingHeading_CaseInsensitive(chunks: TextChunk[], heading: string): TextChunk[] {
        return chunks.filter(c => c.heading?.toLowerCase() === heading.toLowerCase());
    }
}