import { HtmlElementId } from "./htmlElementSelectors";
import { Options } from "./options";

export class HtmlWriter {
    static applyOptions(options: Options): void {
        this.setInputValue(HtmlElementId.DatePrefix, options.datePrefix ?? '');
        if (options.useDate)
            this.setDateInputToToday();
        this.setInputValue(HtmlElementId.IgnoreLinesPrefix, options.ignoreLinesPrefixes?.join(', ') ?? '');
        this.setInputValue(HtmlElementId.HeadingOrder, options.headingOrder?.join(', ') ?? '');
        this.setInputValue(HtmlElementId.IndentMultiplier, options.indentMultiplier?.toString() ?? '');
        this.setCheckbox(HtmlElementId.IgnoreHeadingCase, options.ignoreHeadingCase ?? false);
        this.setCheckbox(HtmlElementId.CopyOnMerge, options.copyOnMerge ?? false);
    }

    private static setInputValue(id: string, value: string): void {
        const element = document.getElementById(id);
        const validTypes = new Set(['text', 'number', 'textarea']);
        if (element instanceof HTMLInputElement && validTypes.has(element.type))
            element.value = value;
    };

    private static setCheckbox(id: string, checked: boolean): void {
        const element = document.getElementById(id);
        if ((element instanceof HTMLInputElement) && (element.type === 'checkbox'))
            element.checked = checked;
    };

    static setDateInputToToday(): void {
        const dateInput = document.getElementById(HtmlElementId.OutputDate) as HTMLInputElement;
        if (dateInput)
            dateInput.value = new Date().toISOString().split('T')[0];
    }

    static writeOutputText(text: string): void {
        const textarea = document.getElementById(HtmlElementId.OutputTextarea) as HTMLTextAreaElement;
        if (textarea)
            textarea.value = text;
    }

    static setCopyOkIconVisibility(show: boolean): void {
        const copyOkElement = document.getElementById(HtmlElementId.CopyOkIcon);
        copyOkElement?.classList.toggle('hidden', !show);
    }
}