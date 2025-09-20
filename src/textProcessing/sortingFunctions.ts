export class SortingFunctions {
    static SortByHeadingOrder(a: string, b: string, headingOrder: string[]): number {
        const indexA = headingOrder.indexOf(a);
        const indexB = headingOrder.indexOf(b);
        if (indexA === -1 && indexB === -1) {
            return 0; // Both headings not found in the order list, maintain their relative order.
        } else if (indexA === -1) {
            return 1; // a not found, b found, b comes first.
        }
        else if (indexB === -1) {
            return -1; // b not found, a found, a comes first.
        }
        else {
            return indexA - indexB; // Both found, sort by their indices.
        }
    }
}