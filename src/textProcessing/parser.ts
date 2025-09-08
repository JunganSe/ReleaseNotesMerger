import { TextChunk } from "./textChunk";

export class Parser {
    chunkifyText(input: string): TextChunk[] {
        const inputChunks = input.split(/\r?\n\r?\n/); // Split on double line breaks. (Empty lines)
        const chunks: TextChunk[] = inputChunks.map(this.parseChunk);
        return chunks.filter(chunk => chunk.content.length > 0);
    }

    private parseChunk(inputChunk: string): TextChunk {
        const lines = inputChunk
            .split(/\r?\n/) // Split on line breaks.
            .filter(line => !line.startsWith('#'));
        const heading = (lines.length > 0) ? lines[0] : null; // Use the first line as heading.
        const content = (lines.length > 1) ? lines.slice(1) : []; // Use all lines except the first as content.
        return { heading, content }
    }
}