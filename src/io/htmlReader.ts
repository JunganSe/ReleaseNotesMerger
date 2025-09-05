import { MergerOptions } from "../textProcessing/mergerOptions";
import { ParserOptions } from "../textProcessing/parserOptions";
import { HtmlElementId } from "./constants";

export class HtmlReader {
    getInputText(): string {
        const textarea = document.getElementById(HtmlElementId.inputTextarea) as HTMLTextAreaElement;
        return textarea?.value || "";
    }

    getParserOptions(): ParserOptions {
        return {
            ignoreCase: false, // TODO: Get ignoreCase from user input.
            trimWhitespace: false, // TODO: Get trimWhitespace from user input.
            forgiveMisspelledHeadings: false // TODO: Get forgiveMisspelledHeadings from user input.
        };
    }

    getMergerOptions(): MergerOptions {
        return {
            date: null, // TODO: Get date from user input.
            headingOrder: [], // TODO: Get headingOrder from user input.
            indentSize: null // TODO: Get indentSize from user input.
        };
    }
}