import { HtmlElementId } from "./constants";

export class HtmlWriter {
    writeOutputText(text: string): void {
        const textarea = document.getElementById(HtmlElementId.outputTextarea) as HTMLTextAreaElement;
        if (textarea)
            textarea.value = text;
    }
}