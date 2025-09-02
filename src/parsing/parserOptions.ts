export interface ParserOptions {
    headingOrder: string[];
    date: Date | undefined;
    ignoreCase: boolean;
    trimWhitespace: boolean;
    forgiveMisspelledHeadings: boolean;
}