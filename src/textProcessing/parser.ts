import { TextChunk } from "./textChunk";

export class Parser {
    chunkifyText(input: string): TextChunk[] {
        const inputChunks = input.split(/\r?\n\r?\n/); // Split on double line breaks. (Empty lines)
        const chunks: TextChunk[] = inputChunks.map(this.parseTextChunk);
        return chunks.filter(chunk => chunk.content.length > 0);
    }

    private parseTextChunk(input: string): TextChunk {
        if (!input?.trim())
            return { heading: null, content: [] };

        const lines = input
            .split(/\r?\n/) // Split on line breaks.
            .filter(line => !line.startsWith('#'));

        if (lines.length === 0)
            return { heading: null, content: [] };

        const heading = lines[0];
        const content = lines.slice(1);
        return { heading, content };
    }
}