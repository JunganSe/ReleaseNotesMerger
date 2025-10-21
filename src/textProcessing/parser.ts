import { ParserOptions } from "../options/parserOptions";
import { Regex } from "./regex";
import { TextChunk } from "./textChunk";

export class Parser {
    private _options: ParserOptions;

    constructor(options: ParserOptions) {
        this._options = options;
    }

    parseTextChunks(input: string): TextChunk[] {
        const lines: string[] = input.split(Regex.lineBreaks);
        const filteredLines = this.getLinesNotStartingWithPrefixes_CaseInsentitive(lines);
        const paragraphs = filteredLines
            .map(line => line.trimEnd())
            .join('\n')
            .split(Regex.doubleLineBreaks) // Split on empty lines.
            .map(paragraph => paragraph.replace(Regex.leadingLineBreaks, '')); // Remove leading newlines. (Happens when there are multiple empty lines between paragraphs.)
        const chunks: TextChunk[] = paragraphs.map(this.parseTextChunk);
        const usableChunks = chunks.filter(chunk => chunk.content.length > 0);
        return usableChunks;
    }

    private getLinesNotStartingWithPrefixes_CaseInsentitive(lines: string[]): string[] {
        const prefixes = this._options.ignoreLinesPrefixes.map(prefix => prefix.toLowerCase());
        return (prefixes.length)
            ? lines.filter(line => !prefixes.some(prefix => line.toLowerCase().startsWith(prefix)))
            : lines;
    }

    private parseTextChunk(input: string): TextChunk {
        if (!input?.trim())
            return { heading: null, content: [] };

        const lines = input.split(Regex.lineBreaks);

        if (lines.length === 0)
            return { heading: null, content: [] };

        const heading = lines[0];
        const content = lines.slice(1);
        return { heading, content };
    }
}