export class CompareBy {
    static preferredOrder(a: string, b: string, preferredOrder: string[]): number {
        const indexA = preferredOrder.indexOf(a);
        const indexB = preferredOrder.indexOf(b);

        if (indexA === -1 && indexB === -1)
            return 0; // Neither string found, maintain their relative order.
        if (indexA === -1)
            return 1; // a not found, b found, b comes first.
        if (indexB === -1)
            return -1; // b not found, a found, a comes first.
        return indexA - indexB; // Both found, sort by their indices.
    }
}