export interface MergerOptions {
    date: Date | null;
    headingOrder: string[];
    indentSize: number | null;
    ignoreHeadingCase: boolean;
    forgiveMisspelledHeadings: boolean;
}