import { Options } from "./options";
import { OptionsValidator } from "./optionsValidator";

export class StorageHandler {
    private static readonly _storageKey = 'options';

    static save(options: Options): void {
        try {
            const jsonOptions = JSON.stringify(options);
            localStorage.setItem(this._storageKey, jsonOptions);
        }
        catch (e) {
            console.error('Failed to save options to localStorage:', e);
        }
    }

    static load(): Options | null {
        try {
            const jsonOptions = localStorage.getItem(this._storageKey);
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

    static clear(): void {
        try {
            localStorage.removeItem(this._storageKey);
        }
        catch (e) {
            console.error('Failed to clear options from localStorage:', e);
        }
    }
}