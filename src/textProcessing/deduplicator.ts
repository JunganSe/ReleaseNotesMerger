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
}