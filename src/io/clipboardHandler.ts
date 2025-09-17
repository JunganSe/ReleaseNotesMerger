export class ClipboardHandler {
    private constructor() { }

    static async copyToClipboard(text: string): Promise<boolean> {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        }
        catch (error) {
            console.error('Failed to copy text to clipboard.', error);
            return false;
        }
    }
}