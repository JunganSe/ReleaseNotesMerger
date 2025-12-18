import { HtmlElementClass, HtmlElementId } from "../io/htmlElementSelectors";
import { HtmlReader } from "../io/htmlReader";
import { HtmlWriter } from "../io/htmlWriter";
import { StorageHandler } from "../io/storageHandler";
import { OptionsHelper } from "../options/optionsHelper";

export class Events {
    // #region Storage
    static saveOptionsToStorage = (): void => {
        const options = HtmlReader.getOptions();
        StorageHandler.saveOptions(options);
    };

    static applyOptionsFromStorage = (): void => {
        const options = StorageHandler.loadOptions();
        if (options)
            HtmlWriter.applyOptions(options);
    };

    static clearOptions = (): void => {
        const options = OptionsHelper.getDefaultOptions();
        HtmlWriter.applyOptions(options);
    };
    // #endregion Storage

    static toggleIoLayout = (): void => {
        const layoutModes = ['auto', 'row', 'column'];
        const currentMode = HtmlReader.getLayoutMode();
        const currentModeIndex = layoutModes.indexOf(currentMode);
        const newMode = layoutModes[(currentModeIndex + 1) % layoutModes.length];
        HtmlWriter.setLayoutMode(newMode);
    };

    static triggerCallbackOnCtrlEnter = (event: KeyboardEvent, callback: () => void): void => {
        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            callback();
        }
    };
}