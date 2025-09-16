export class ClipboardHandler {
    async copyToClipboard(text: string): Promise<void> {
        try {
            await navigator.clipboard.writeText(text);
            // TODO: Indicate success at the button.
        } catch (err) {
            console.error('Failed to copy text to clipboard.', err);
        }
    }
}