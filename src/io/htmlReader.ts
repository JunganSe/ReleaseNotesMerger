import { MergerOptions } from "../textProcessing/mergerOptions";
import { HtmlElementId } from "./constants";

export class HtmlReader {
    getInputText(): string {
        const textarea = this.getTextarea(HtmlElementId.inputTextarea);
        return textarea?.value ?? '';
    }

    getMergerOptions(): MergerOptions {
        return {
            date: this.readInput_Date(HtmlElementId.outputDate),
            headingOrder: this.readInput_String(HtmlElementId.outputheadingOrder)
                ?.split(',')
                .map(str => str.trim())
                ?? [],
            indentSize: this.readInput_Number(HtmlElementId.outputIndentSize),
            ignoreHeadingCase: this.readInput_Checkbox(HtmlElementId.ignoreCase) ?? false,
            allowMisspelledHeadings: this.readInput_Checkbox(HtmlElementId.allowMisspelledHeadings) ?? false,
        };
    }



    private readInput_Checkbox(id: string): boolean | null {
        const element = this.getInputElement(id, 'checkbox');
        return (element)
            ? element.checked
            : null;
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

    /** Gets an input element, optionally of a specific type. */
    private getInputElement(id: string, type?: string): HTMLInputElement | null {
        const element = document.getElementById(id);
        if (!(element instanceof HTMLInputElement)
            || (type && element.type !== type))
            return null;
        return element;
    }

    private getTextarea(id: string): HTMLTextAreaElement | null {
        const element = document.getElementById(id);
        return (element instanceof HTMLTextAreaElement)
            ? element
            : null;
    }
}