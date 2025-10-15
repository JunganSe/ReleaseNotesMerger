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
     *  - They have x% or more characters in the same order, but not necessarily consecutively. Case insensitive.
     *  - Their lengths are within x% of each other.
     */
    private static areStringsSimilar(string1: string, string2: string, percentThreshold: number): boolean {
        const threshold = Math.min(Math.max(percentThreshold, 0), 100); // Clamp to [0, 100].
        if (threshold === 0)
            return true;

        const str1 = string1.toLowerCase();
        const str2 = string2.toLowerCase();

        const minLength = Math.min(str1.length, str2.length);
        const maxLength = Math.max(str1.length, str2.length);

        if (maxLength === 0)
            return true; // Both strings are empty.

        const lengthDiffPercent = ((maxLength - minLength) / maxLength) * 100;
        if (lengthDiffPercent > 100 - threshold)
            return false; // Length difference exceeds 10%.

        const lcsLength = this.getLcsLength(str1, str2); // Calculate Longest Common Subsequence (LCS) length.
        const matchPercent = (lcsLength / maxLength) * 100; // Get percentage of matching characters in same order.

        return matchPercent >= threshold;
    }

    /** Calculates the length of the Longest Common Subsequence (LCS) between two strings.
     *  LCS is the longest sequence that appears in both strings in the same order, but not necessarily consecutively.
     *  Courtesy of Claude. See https://en.wikipedia.org/wiki/Longest_common_subsequence_problem */
    private static getLcsLength(s1: string, s2: string): number {
        const m = s1.length;
        const n = s2.length;

        // Create DP table
        const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

        // Fill DP table
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (s1[i - 1] === s2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        return dp[m][n];
    }
}