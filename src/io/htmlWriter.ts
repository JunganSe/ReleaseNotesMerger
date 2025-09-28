import { HtmlElementId } from "./htmlElementSelectors";

export class HtmlWriter {
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