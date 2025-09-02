export class Controller {
    initialize(): void {
        this.setButtonEvents();
    }

    private setButtonEvents(): void {
        document.getElementById('btn-merge')?.addEventListener('click', this.click_MergeButton);
        document.getElementById('btn-copy')?.addEventListener('click', this.click_CopyButton);
    }

    private click_MergeButton(): void {
        // TODO: Implement merge functionality.
        console.log('Merge button clicked.');
    }

    private click_CopyButton() {
        // TODO: Implement copy to clipboard functionality.
        console.log('Copy button clicked.');
    }
}