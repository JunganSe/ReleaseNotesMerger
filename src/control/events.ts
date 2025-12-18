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
        const button = document.getElementById(HtmlElementId.ToggleLayoutButton);
        const container = document.getElementById(HtmlElementId.IoContainer);;
        if (!button || !container)
            return;

        const attributeName = 'data-layout';
        const layoutModes = ['auto', 'row', 'column'];

        const currentMode = container.attributes.getNamedItem(attributeName)?.value ?? layoutModes[0];
        const currentModeIndex = layoutModes.indexOf(currentMode);
        const newMode = layoutModes[(currentModeIndex + 1) % layoutModes.length];

        container.setAttribute(attributeName, newMode);
        button.textContent = `${newMode.charAt(0).toUpperCase() + newMode.slice(1)}`;
    };

    static triggerCallbackOnCtrlEnter = (event: KeyboardEvent, callback: () => void): void => {
        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            callback();
        }
    };
}