import { Options } from "./options";
import { OptionsValidator } from "./optionsValidator";
import { StorageKey } from "./storageKeys";

export class StorageHandler {

    static saveOptions(options: Options): void {
        try {
            const jsonOptions = JSON.stringify(options);
            localStorage.setItem(StorageKey.Options, jsonOptions);
        }
        catch (e) {
            console.error('Failed to save options to localStorage:', e);
        }
    }

    static loadOptions(): Options | null {
        try {
            const jsonOptions = localStorage.getItem(StorageKey.Options);
            if (!jsonOptions)
                return null;

            const options: Options = JSON.parse(jsonOptions);

            if (!OptionsValidator.isValidOptions(options)) {
                console.error('Invalid options structure in localStorage');
                return null;
            }

            return options;
        }
        catch (e) {
            console.error('Failed to load options from localStorage:', e);
            return null;
        }
    }

    static clearOptions(): void {
        try {
            localStorage.removeItem(StorageKey.Options);
        }
        catch (e) {
            console.error('Failed to clear options from localStorage:', e);
        }
    }
}