import { MergerOptions } from "../textProcessing/mergerOptions";
import { ParserOptions } from "../textProcessing/parserOptions";
import { HtmlElementId } from "./constants";

export class HtmlReader {
    getInputText(): string {
        const textarea = document.getElementById(HtmlElementId.inputTextarea) as HTMLTextAreaElement;
        return textarea?.value || '';
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
        const element = this.getInputElement(id, 'checkbox');
        return (element)
            ? !!element.checked
            : false;
    }

    private readInput_Date(id: string): Date | null {
        const element = this.getInputElement(id, 'date');
        if (!element || !element.value)
            return null;

        const date = new Date(element.value);
        return (!isNaN(date.getTime()))
            ? date
            : null;
    }

    private readInput_String(id: string): string | null {
        const element = this.getInputElement(id, 'text');
        return element?.value ?? null;
    }

    private readInput_Number(id: string): number | null {
        const element = this.getInputElement(id, 'number');
        if (!element || !element.value)
            return null;

        const parsedValue = Number(element.value.trim());
        return (!isNaN(parsedValue))
            ? parsedValue
            : null;
    }

    private getInputElement(id: string, type?: string): HTMLInputElement | null {
        const element = document.getElementById(id);
        if (!(element instanceof HTMLInputElement)
            || (type && element.type !== type))
            return null;
        return element;
    }
}