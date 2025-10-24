import { HtmlReader } from "../io/htmlReader";
import { HtmlWriter } from "../io/htmlWriter";
import { StorageHandler } from "../io/storageHandler";
import { OptionsHelper } from "../options/optionsHelper";

export class Events {
    // #region Storage
    static saveOptionsToStorage = (): void => {
        const options = HtmlReader.getOptions();
        StorageHandler.saveOptions(options);
    }

    static applyOptionsFromStorage = (): void => {
        const options = StorageHandler.loadOptions();
        if (options)
            HtmlWriter.applyOptions(options);
    }

    static clearOptions = (): void => {
        const options = OptionsHelper.getDefaultOptions();
        HtmlWriter.applyOptions(options);
    }
    // #endregion Storage
}