import { HtmlElementId } from "./constants";

export class HtmlWriter {
    setDateInputToToday(): void {
        const dateInput = document.getElementById(HtmlElementId.outputDate) as HTMLInputElement;
        if (dateInput)
            dateInput.value = new Date().toISOString().split('T')[0];
    }
    
    writeOutputText(text: string): void {
        const textarea = document.getElementById(HtmlElementId.outputTextarea) as HTMLTextAreaElement;
        if (textarea)
            textarea.value = text;
    }
}