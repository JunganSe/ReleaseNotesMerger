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
            ignoreCase: this.readInput_Checkbox(HtmlElementId.ignoreCase),
            trimWhitespace: this.readInput_Checkbox(HtmlElementId.trimWhitespace),
            forgiveMisspelledHeadings: this.readInput_Checkbox(HtmlElementId.forgiveMisspelledHeadings),
        };
    }

    getMergerOptions(): MergerOptions {
        return {
            date: this.readInput_Date(HtmlElementId.outputDate),
            headingOrder: this.readInput_String(HtmlElementId.outputheadingOrder)?.split(',') ?? [],
            indentSize: this.readInput_Number(HtmlElementId.outputindentSize),
        };
    }



    private readInput_Checkbox(id: string): boolean {
        const element = document.getElementById(id);
        return (element instanceof HTMLInputElement)
            ? !!element.checked
            : false;
    }

    private readInput_Date(id: string): Date | null {
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

    private readInput_String(id: string): string | null {
        const element = document.getElementById(id);
        if (!(element instanceof HTMLInputElement)
            || element.type !== "text"
            || !element.value)
            return null;

        return (element as HTMLInputElement).value
    }

    private readInput_Number(id: string): number | null {
        const element = document.getElementById(id);
        if (!(element instanceof HTMLInputElement)
            || element.type !== "number"
            || !element.value)
            return null;

        const parsedValue = Number(element.value.trim());
        return (!isNaN(parsedValue))
            ? parsedValue
            : null;
    }
}