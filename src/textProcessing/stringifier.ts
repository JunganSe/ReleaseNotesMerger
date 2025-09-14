import { TextChunk } from "./textChunk";

export class Stringifier {
    stringifyChunks(chunks: TextChunk[]): string {
        const outputLines: string[] = [];
        chunks.forEach(chunk => {
            const chunkLines = this.stringifyChunk(chunk);
            outputLines.push(...chunkLines);
        });
        return outputLines.join('\n');
    }

    private stringifyChunk(chunk: TextChunk): string[] {
        const heading = chunk.heading?.trim();
        const content = chunk.content?.filter(line => !!line?.trim()) ?? [];

        if (!heading && !content.length)
            return [];

        const outputLines: string[] = [];
        if (heading)
            outputLines.push(heading);
        if (content.length)
            outputLines.push(...content);
        outputLines.push('');

        return outputLines;
    }
}