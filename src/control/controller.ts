import { ClipboardHandler } from "../io/clipboardHandler";
import { HtmlElementClass, HtmlElementId } from "../io/htmlElementSelectors";
import { HtmlReader } from "../io/htmlReader";
import { HtmlWriter } from "../io/htmlWriter";
import { StorageHandler } from "../io/storageHandler";
import { Merger } from "../textProcessing/merger";
import { Parser } from "../textProcessing/parser";
import { Stringifier } from "../textProcessing/stringifier";

// TODO: Numeric input for indent multiplier. (Multiplies leading spaces by this number.)
// TODO: Checkbox to enable/disable copy-to-clipboard on merge.
// TODO: Checkbox to enable/disable auto-merge on input text change.
// TODO: Button to reset options to default values?

export class Controller {
    initialize(): void {
        this.applyOptionsFromStorage();
        HtmlWriter.setDateInputToToday();
        this.setEvents();
    }

    private applyOptionsFromStorage(): void {
        const options = StorageHandler.load();
        if (options)
            HtmlWriter.applyOptions(options);
    }

    private saveOptionsToStorage(): void {
        const options = HtmlReader.getOptions();
        StorageHandler.save(options);
    }

    private setEvents(): void {
        document.getElementById(HtmlElementId.SaveOptionsButton)?.addEventListener('click', this.onClick_SaveOptionsButton);
        document.getElementById(HtmlElementId.MergeButton)?.addEventListener('click', this.onClick_MergeButton);
        document.getElementById(HtmlElementId.CopyButton)?.addEventListener('click', this.onClick_CopyButton);

        document.getElementById(HtmlElementId.InputTextarea)?.addEventListener('keydown', this.triggerMergeOnCtrlEnter);
        document.querySelector(`.${HtmlElementClass.OptionsContainer}`)?.querySelectorAll('input').forEach(input =>
            input.addEventListener('keydown', this.triggerMergeOnCtrlEnter));

        document.getElementById(HtmlElementId.OutputTextarea)?.addEventListener('change', this.onChange_OutputText);
    }

    private onClick_SaveOptionsButton = (): void => {
        this.saveOptionsToStorage();
    }

    private onClick_MergeButton = (): void => {
        // Initialize workers
        const parser = new Parser(HtmlReader.getParserOptions());
        const merger = new Merger(HtmlReader.getMergerOptions());
        const stringifier = new Stringifier(HtmlReader.getStringifierOptions());

        // Process text
        const inputText = HtmlReader.getInputText();
        const inputChunks = parser.parseTextChunks(inputText);
        const mergedChunks = merger.mergeChunks(inputChunks);
        const outputText = stringifier.getStringifiedOutput(mergedChunks);
        HtmlWriter.writeOutputText(outputText);

        this.onChange_OutputText();
        if (HtmlReader.getCopyOnMerge())
            this.onClick_CopyButton();
    }

    private onClick_CopyButton = (): void => {
        const outputText = HtmlReader.getOutputText();
        if (!outputText)
            return;

        ClipboardHandler.tryCopyToClipboard(outputText)
            .then((isSuccess) => {
                if (isSuccess) {
                    HtmlWriter.setCopyOkIconVisibility(true);
                    console.log('Copied output text to clipboard.');
                }
            });
    }

    private triggerMergeOnCtrlEnter = (event: KeyboardEvent): void => {
        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            this.onClick_MergeButton();
        }
    }

    private onChange_OutputText = (): void => {
        HtmlWriter.setCopyOkIconVisibility(false);
    }
}