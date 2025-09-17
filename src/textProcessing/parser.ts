import { TextChunk } from "./textChunk";

export class Parser {
    private constructor() { }

    static chunkifyText(input: string): TextChunk[] {
        const lines: string[] = input.split(/\r?\n/) // Split on line breaks.;
        const paragraphs = lines
            .filter(line => !line.startsWith('#'))
            .map(line => line.trimEnd())
            .join('\n')
            .split(/\n\n/) // Split on double line breaks. (Empty lines)
            .map(paragraph => paragraph.replace(/^\n+/, '')); // Remove leading newlines. (Happens when there are multiple empty lines between paragraphs.)
        const chunks: TextChunk[] = paragraphs.map(this.parseTextChunk);
        const usableChunks = chunks.filter(chunk => chunk.content.length > 0);
        return usableChunks;
    }

    private static parseTextChunk(input: string): TextChunk {
        if (!input?.trim())
            return { heading: null, content: [] };

        const lines = input.split(/\r?\n/); // Split on line breaks.

        if (lines.length === 0)
            return { heading: null, content: [] };

        const heading = lines[0];
        const content = lines.slice(1);
        return { heading, content };
    }
}