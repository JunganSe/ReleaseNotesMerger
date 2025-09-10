import { HtmlElementId } from "../io/constants";
import { HtmlReader } from "../io/htmlReader";
import { HtmlWriter } from "../io/htmlWriter";
import { Merger } from "../textProcessing/merger";
import { Parser } from "../textProcessing/parser";

export class Controller {
    initialize(): void {
        this.setDateInputToToday();
        this.setButtonEvents();
    }

    private setDateInputToToday(): void {
        const dateInput = document.getElementById(HtmlElementId.outputDate) as HTMLInputElement;
        if (dateInput)
            dateInput.value = new Date().toISOString().split('T')[0];
    }

    private setButtonEvents(): void {
        document.getElementById('btn-merge')?.addEventListener('click', this.click_MergeButton);
        document.getElementById('btn-copy')?.addEventListener('click', this.click_CopyButton);
    }

    private click_MergeButton = (): void => {
        // Initialize workers
        const htmlReader = new HtmlReader();
        const parser = new Parser();
        const mergerOptions = htmlReader.getMergerOptions();
        const merger = new Merger(mergerOptions);
        const htmlWriter = new HtmlWriter();

        // Process text
        const inputText = htmlReader.getInputText();
        const inputChunks = parser.chunkifyText(inputText);
        const mergedChunks = merger.mergeChunks(inputChunks);
        const outputText = merger.stringifyChunks(mergedChunks);
        htmlWriter.writeOutputText(outputText);
    }

    private click_CopyButton = (): void => {
        // TODO: Implement copy to clipboard functionality.
        // - Get output text
        // - Copy to clipboard
        console.log('Copy button clicked.');
    }
}