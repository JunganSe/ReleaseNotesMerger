import { Comparers } from "./comparers";

export class SortBy {
    /**
     * Sorts the given items according to the preferred order.
     * Items not found in the preferred order are placed at the end, maintaining their original relative order.
     * Mutates the provided items array.
     * @param items The array of strings to be sorted.
     * @param preferredOrder The array defining the preferred order.
     * @returns The sorted array of strings, which is the same as the items parameter.
     */
    static preferredOrder(items: string[], preferredOrder: string[]): string[] {
        return items.sort((a, b) => Comparers.compareByPreferredOrder(a, b, preferredOrder));
    }
}