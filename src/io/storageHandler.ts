import { Options } from "./options";
import { OptionsValidator } from "./optionsValidator";
import { StorageKey } from "./storageKeys";

export class StorageHandler {

    static saveOptions(options: Options): void {
        this.save(StorageKey.Options, options);
    }

    private static save<T>(key: string, item: T): void {
        try {
            const jsonItem = JSON.stringify(item);
            localStorage.setItem(key, jsonItem);
        }
        catch (e) {
            console.error(`Failed to save item with key "${key}" to localStorage.`, e);
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