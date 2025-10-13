import { TextChunk } from "./textChunk";

export class TextChunkHelper {
    static getUniqueHeadings(chunks: TextChunk[]): string[] {
        const headings = chunks
            .map(chunk => chunk.heading)
            .filter(heading => heading != null);
        return [...new Set(headings)];
    }

    /** Adds the content of the inputChunk to an outputChunk with matching heading. */
    static addContentToMatchingOutputChunk(inputChunk: TextChunk, outputChunks: TextChunk[], isCaseSensitive: boolean): void {
        const outputChunk = outputChunks.find(chunk => (isCaseSensitive)
            ? chunk.heading === inputChunk.heading
            : chunk.heading?.toLowerCase() === inputChunk.heading?.toLowerCase());
        outputChunk?.content.push(...inputChunk.content);
    }

    static applyIndentMultiplier(chunks: TextChunk[], indentMultiplier: number): void {
        // TODO: Implement indent multiplier application.
        throw new Error("Not implemented");
    }
}