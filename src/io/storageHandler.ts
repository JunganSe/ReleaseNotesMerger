import { Options } from "./options";
import { OptionsValidator } from "./optionsValidator";
import { StorageKey } from "./storageKeys";

export class StorageHandler {
    // #region Save
    static saveOptions(options: Options): void {
        this.save(StorageKey.Options, options);
    }

    static saveOptionsAccordionState(isOpen: boolean): void {
        this.save(StorageKey.OptionsAccordionOpen, isOpen);
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
    // #endregion Save

    // Region Load
    static loadOptions(): Options | null {
        const options = this.load<Options>(StorageKey.Options);

        if (!OptionsValidator.isValidOptions(options)) {
            console.error('Invalid or missing options item in localStorage');
            return null;
        }
        
        return options;
    }

    static loadOptionsAccordionState(): boolean | null {
        return this.load<boolean>(StorageKey.OptionsAccordionOpen);
    }

    private static load<T>(key: string): T | null {
        try {
            const jsonItem = localStorage.getItem(key);
            if (!jsonItem)
                return null;

            const item: T = JSON.parse(jsonItem);
            return item;
        }
        catch (e) {
            console.error(`Failed to load item with key "${key}" from localStorage.`, e);
            return null;
        }
    }
    // #endregion Load

    // #region Clear
    static clearOptions(): void {
        this.clear(StorageKey.Options);
    }

    private static clear(key: string): void {
        try {
            localStorage.removeItem(key);
        }
        catch (e) {
            console.error(`Failed to clear item with key "${key}" from localStorage:`, e);
        }
    }
    // #endregion Clear
}