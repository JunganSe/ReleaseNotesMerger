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
     *  - Their lengths are within x% of each other.
     *  - They have x% or more characters in the same order, but not necessarily consecutively. Case insensitive.
     */
    private static areStringsSimilar(stringA: string, stringB: string, percentThreshold: number): boolean {
        if (stringA.length === 0 && stringB.length === 0)
            return true; // Both strings are empty.

        const threshold = Math.min(Math.max(percentThreshold, 0), 100); // Clamp to [0, 100].
        if (threshold === 0)
            return true; // Threshold is 0, there are no restrictions.

        const strA = stringA.toLowerCase();
        const strB = stringB.toLowerCase();

        const minLength = Math.min(strA.length, strB.length);
        const maxLength = Math.max(strA.length, strB.length);

        const lengthDiffPercent = ((maxLength - minLength) / maxLength) * 100;
        if (lengthDiffPercent > 100 - threshold)
            return false; // Length difference is more than allowed.

        const lcsLength = this.getLcsLength(strA, strB); // Calculate Longest Common Subsequence (LCS) length.
        const matchPercent = (lcsLength / maxLength) * 100; // Get percentage of matching characters in same order.

        return (matchPercent >= threshold);
    }

    /** Calculates the length of the Longest Common Subsequence (LCS) between two strings.
     *  LCS is the longest sequence that appears in both strings in the same order, but not necessarily consecutively.
     *  Courtesy of Claude. See https://en.wikipedia.org/wiki/Longest_common_subsequence_problem */
    private static getLcsLength(stringA: string, stringB: string): number {
        const lengthA = stringA.length;
        const lengthB = stringB.length;

        // Create DP (dynamic programming) table.
        const dp: number[][] =
            Array(lengthA + 1)
                .fill(null)
                .map(() => Array(lengthB + 1).fill(0));

        // Fill DP table.
        for (let iA = 1; iA <= lengthA; iA++) {
            for (let iB = 1; iB <= lengthB; iB++) {
                if (stringA[iA - 1] === stringB[iB - 1])
                    dp[iA][iB] = dp[iA - 1][iB - 1] + 1;
                else
                    dp[iA][iB] = Math.max(dp[iA - 1][iB], dp[iA][iB - 1]);
            }
        }

        return dp[lengthA][lengthB];
    }
}