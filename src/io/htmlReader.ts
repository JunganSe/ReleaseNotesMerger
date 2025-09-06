import { MergerOptions } from "../textProcessing/mergerOptions";
import { ParserOptions } from "../textProcessing/parserOptions";
import { HtmlElementId } from "./constants";

export class HtmlReader {
    getInputText(): string {
        const textarea = document.getElementById(HtmlElementId.inputTextarea) as HTMLTextAreaElement;
        return textarea?.value || "";
    }

    getParserOptions(): ParserOptions {
        return {
            ignoreCase: this.getCheckboxValue(HtmlElementId.ignoreCase),
            trimWhitespace: this.getCheckboxValue(HtmlElementId.trimWhitespace),
            forgiveMisspelledHeadings: this.getCheckboxValue(HtmlElementId.forgiveMisspelledHeadings),
        };
    }

    getMergerOptions(): MergerOptions {
        return {
            date: this.getDateValue(HtmlElementId.outputDate),
            headingOrder: [], // TODO: Get headingOrder from user input.
            indentSize: null // TODO: Get indentSize from user input.
        };
    }

    private getCheckboxValue(id: string): boolean {
        const element = document.getElementById(id);
        return (element instanceof HTMLInputElement)
            ? !!element.checked
            : false;
    }

    private getDateValue(id: string): Date | null {
        const element = document.getElementById(id);
        if (!(element instanceof HTMLInputElement)
            || element.type !== "date"
            || !element.value)
            return null;

        const date = new Date(element.value);
        return (!isNaN(date.getTime()))
            ? date
            : null;
    }

    private getStringValue(id: string): string | null {
        const element = document.getElementById(id);
        return (element instanceof HTMLInputElement && element.value)
            ? element.value
            : null;
    }
}