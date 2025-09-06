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
            date: null, // TODO: Get date from user input.
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
}