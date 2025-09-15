import { StringifierOptions } from "./stringifierOptions";
import { TextChunk } from "./textChunk";

export class Stringifier {
    private _options: StringifierOptions;

    constructor(options: StringifierOptions) {
        this._options = options;
    }

    getStringifiedOutput(chunks: TextChunk[]): string {
        // TODO: get the date. If options.date is null, use today's date.
        // TODO: Get the stringified chunks.
        // TODO: Combine and return the final output.
    }

    private getDateString(): string | null {
        // TODO: Use option for date prefix (e.g. "## ")
        const date = this._options.date?.toISOString().split('T')[0];
        return (date)
            ? `## ${date}`
            : null;
    }

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

        if (!heading && !content.length) return [];

        const outputLines: string[] = [];
        if (heading)
            outputLines.push(heading);
        if (content.length)
            outputLines.push(...content);
        outputLines.push('');

        return outputLines;
    }
}