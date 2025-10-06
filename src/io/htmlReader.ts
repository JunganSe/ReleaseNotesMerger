import { MergerOptions } from "../textProcessing/mergerOptions";
import { ParserOptions } from "../textProcessing/parserOptions";
import { StringifierOptions } from "../textProcessing/stringifierOptions";
import { HtmlElementId } from "./htmlElementSelectors";
import { Options } from "./options";

export class HtmlReader {

    // #region Option objects
    static getOptions(): Options {
        const options: Options = {
            datePrefix: this.getDatePrefx(),
            ignoreLinesPrefixes: this.getIgnoreLinesPrefixes(),
            headingOrder: this.getHeadingOrder(),
            ignoreHeadingCase: this.getIgnoreHeadingCase(),
        };
        return options;
    }

    static getParserOptions(): ParserOptions {
        return {
            ignoreLinesPrefixes: this.getIgnoreLinesPrefixes(),
        };
    }

    static getMergerOptions(): MergerOptions {
        return {
            headingOrder: this.getHeadingOrder(),
            ignoreHeadingCase: this.getIgnoreHeadingCase(),
            allowMisspelledHeadings: this.getAllowMisspelledHeadings(),
        };
    }

    static getStringifierOptions(): StringifierOptions {
        return {
            datePrefix: this.getDatePrefx(),
            date: this.getOutputDate(),
        };
    }

    // #endregion Option objects

    // #region Specific elements

    private static getDatePrefx(): string | null {
        return this.readInput_String(HtmlElementId.DatePrefix);
    }

    private static getOutputDate(): Date | null {
        return this.readInput_Date(HtmlElementId.OutputDate);
    }

    private static getIgnoreLinesPrefixes(): string[] {
        return this.readInput_String(HtmlElementId.IgnoreLinesPrefix)
            ?.split(',')
            .map(str => str.trim())
            .filter(str => str.length)
            ?? [];
    }

    private static getHeadingOrder(): string[] {
        return this.readInput_String(HtmlElementId.HeadingOrder)
            ?.split(',')
            .map(str => str.trim())
            .filter(str => str.length)
            ?? [];
    }

    private static getIgnoreHeadingCase(): boolean {
        return this.readInput_Checkbox(HtmlElementId.IgnoreHeadingCase) ?? false;
    }

    private static getAllowMisspelledHeadings(): boolean {
        return this.readInput_Checkbox(HtmlElementId.AllowMisspelledHeadings) ?? false;
    }

    static getInputText(): string {
        const textarea = this.getTextarea(HtmlElementId.InputTextarea);
        return textarea?.value?.trim() ?? '';
    }

    static getOutputText(): string | null {
        const textarea = this.getTextarea(HtmlElementId.OutputTextarea);
        return textarea?.value?.trim() ?? null;
    }

    // #endregion Specific elements

    // #region Support methods

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

    // #endregion Support methods
}