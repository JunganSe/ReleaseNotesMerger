export class Deduplicator {
    /** Returns an array of strings where versions that only differ by casing have been removed.
     *  Prefers versions found in the preferredStrings parameter, then capitalized versions. */
    static getCasingDeduplicatedStrings(inputStrings: string[], preferredStrings: string[]): string[] {
        const chosenStrings = inputStrings.map(inputString => {
            const matchingStrings = inputStrings.filter(str => str.toLowerCase() === inputString.toLowerCase());
            const preferredString = preferredStrings.find(ph => matchingStrings.some(h => h.toLowerCase() === ph.toLowerCase()));
            const firstCapitalizedString = matchingStrings.find(h => h && h[0] === h[0].toUpperCase());
            return preferredString ?? firstCapitalizedString ?? inputString;
        });
        const deduplicatedStrings = new Set(chosenStrings);
        return [...deduplicatedStrings];
    }

    /** Returns an array of strings where versions that only differ slightly in spelling have been removed.
     *  Prefers versions found in the preferredStrings parameter, otherwise the first version. */
    static getSpellingDeduplicatedStrings(inputStrings: string[], preferredStrings: string[]): string[] {
        // TODO: Implement spelling deduplication.
        throw new Error("Not implemented");
    }

    /** Considers strings similar if:
     *  - They have 90% or more characters in the same order (case insensitive).
     *  - They differ in lengt by at most 10%. */
    private static areStringsSimilar(str1: string, str2: string): boolean {
        // TODO: Implement string similarity check.
        throw new Error("Not implemented");
    }
}