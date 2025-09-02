export interface ParserOptions {
    headingOrder: string[];
    newDate: Date | undefined;
    ignoreCase: boolean;
    trimWhitespace: boolean;
    forgiveMisspelledHeadings: boolean;
}