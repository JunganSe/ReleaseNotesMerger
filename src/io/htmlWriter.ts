import { HtmlElementId } from "./htmlElementSelectors";
import { Options } from "./options";

export class HtmlWriter {
    static applyOptions(options: Options): void {
        const datePrefixInput = document.getElementById(HtmlElementId.DatePrefix) as HTMLInputElement;
        if (datePrefixInput)
            datePrefixInput.value = options.datePrefix ?? '';

        const ignoreLinesInput = document.getElementById(HtmlElementId.IgnoreLinesPrefix) as HTMLInputElement;
        if (ignoreLinesInput)
            ignoreLinesInput.value = options.ignoreLinesPrefixes?.join(', ') ?? '';

        const headingOrderInput = document.getElementById(HtmlElementId.HeadingOrder) as HTMLInputElement;
        if (headingOrderInput)
            headingOrderInput.value = options.headingOrder?.join(', ') ?? '';

        const indentMultiplierInput = document.getElementById(HtmlElementId.IndentMultiplier) as HTMLInputElement;
        if (indentMultiplierInput)
            indentMultiplierInput.value = options.indentMultiplier?.toString() ?? '';

        const ignoreHeadingCaseInput = document.getElementById(HtmlElementId.IgnoreHeadingCase) as HTMLInputElement;
        if (ignoreHeadingCaseInput)
            ignoreHeadingCaseInput.checked = options.ignoreHeadingCase ?? false;

        const copyOnMergeInput = document.getElementById(HtmlElementId.CopyOnMerge) as HTMLInputElement;
        if (copyOnMergeInput)
            copyOnMergeInput.checked = options.copyOnMerge ?? false;
    }

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