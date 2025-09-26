export class ClipboardHandler {
    static async tryCopyToClipboard(text: string): Promise<boolean> {
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