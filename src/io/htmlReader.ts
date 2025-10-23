import { Options } from "../options/options";
import { MergerOptions } from "../options/mergerOptions";
import { ParserOptions } from "../options/parserOptions";
import { StringifierOptions } from "../options/stringifierOptions";
import { HtmlElementId } from "./htmlElementSelectors";

export class HtmlReader {

    // #region Option objects
    static getOptions(): Options {
        const options: Options = {
            datePrefix: this.getDatePrefx(),
            useDate: (this.getOutputDate() != null),
            ignoreLinesPrefixes: this.getIgnoreLinesPrefixes(),
            headingOrder: this.getHeadingOrder(),
            indentMultiplier: this.getIndentMultiplier(),
            ignoreHeadingCase: this.getIgnoreHeadingCase(),
            copyOnMerge: this.getCopyOnMerge(),
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
            indentMultiplier: this.getIndentMultiplier(),
            ignoreHeadingCase: this.getIgnoreHeadingCase(),
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

    static getDatePrefx(): string | null {
        return this.readInput_String(HtmlElementId.DatePrefix);
    }

    static getOutputDate(): Date | null {
        return this.readInput_Date(HtmlElementId.OutputDate);
    }

    static getIgnoreLinesPrefixes(): string[] {
        return this.readInput_String(HtmlElementId.IgnoreLinesPrefix)
            ?.split(',')
            .map(str => str.trim())
            .filter(str => str.length)
            ?? [];
    }

    static getHeadingOrder(): string[] {
        return this.readInput_String(HtmlElementId.HeadingOrder)
            ?.split(',')
            .map(str => str.trim())
            .filter(str => str.length)
            ?? [];
    }

    static getIndentMultiplier(): number {
        return this.readInput_Number(HtmlElementId.IndentMultiplier) ?? 1;
    }

    static getIgnoreHeadingCase(): boolean {
        return this.readInput_Checkbox(HtmlElementId.IgnoreHeadingCase) ?? false;
    }

    static getCopyOnMerge(): boolean {
        return this.readInput_Checkbox(HtmlElementId.CopyOnMerge) ?? false;
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