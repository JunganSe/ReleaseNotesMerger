import { MergerOptions } from "../textProcessing/mergerOptions";
import { StringifierOptions } from "../textProcessing/stringifierOptions";
import { HtmlElementId } from "./constants";

export class HtmlReader {
    private constructor() { }

    static getInputText(): string {
        const textarea = this.getTextarea(HtmlElementId.InputTextarea);
        return textarea?.value?.trim() ?? '';
    }

    static getOutputText(): string | null {
        const textarea = this.getTextarea(HtmlElementId.OutputTextarea);
        return textarea?.value?.trim() ?? null;
    }

    static getMergerOptions(): MergerOptions {
        return {
            headingOrder: this.readInput_String(HtmlElementId.OutputHeadingOrder)
                ?.split(',').map(str => str.trim()) ?? [],
            indentSize: this.readInput_Number(HtmlElementId.OutputIndentSize),
            ignoreHeadingCase: this.readInput_Checkbox(HtmlElementId.IgnoreCase) ?? false,
            allowMisspelledHeadings: this.readInput_Checkbox(HtmlElementId.AllowMisspelledHeadings) ?? false,
        };
    }

    static getStringifierOptions(): StringifierOptions {
        return {
            datePrefix: this.readInput_String(HtmlElementId.DatePrefix),
            date: this.readInput_Date(HtmlElementId.OutputDate),
        };
    }



    private static readInput_Checkbox(id: string): boolean | null {
        const element = this.getInputElement(id, 'checkbox');
        return (element)
            ? element.checked
            : null;
    }

    private static readInput_Date(id: string): Date | null {
        const element = this.getInputElement(id, 'date');
        if (!element || !element.value)
            return null;

        const date = new Date(element.value);
        return (!isNaN(date.getTime()))
            ? date
            : null;
    }

    private static readInput_String(id: string): string | null {
        const element = this.getInputElement(id, 'text');
        return element?.value ?? null;
    }

    private static readInput_Number(id: string): number | null {
        const element = this.getInputElement(id, 'number');
        if (!element || !element.value)
            return null;

        const parsedValue = Number(element.value.trim());
        return (!isNaN(parsedValue))
            ? parsedValue
            : null;
    }

    /** Gets an input element, optionally of a specific type. */
    private static getInputElement(id: string, type?: string): HTMLInputElement | null {
        const element = document.getElementById(id);
        if (!(element instanceof HTMLInputElement)
            || (type && element.type !== type))
            return null;
        return element;
    }

    private static getTextarea(id: string): HTMLTextAreaElement | null {
        const element = document.getElementById(id);
        return (element instanceof HTMLTextAreaElement)
            ? element
            : null;
    }
}