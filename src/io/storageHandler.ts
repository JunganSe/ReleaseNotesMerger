import { Options } from "./options";

export class StorageHandler {
    private static readonly _storageKey = 'options';

    static save(options: Options): void {
        const jsonOptions = JSON.stringify(options);
        localStorage.setItem(this._storageKey, jsonOptions);
    }

    static load(): Options | null {
        const jsonOptions = localStorage.getItem(this._storageKey);
        if (!jsonOptions)
            return null;

        try {
            const options: Options = JSON.parse(jsonOptions);
            return options;
        }
        catch (e) {
            console.error("Failed to parse options from localStorage:", e);
            return null;
        }
    }
}