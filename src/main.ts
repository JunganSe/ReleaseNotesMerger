// TODO: Controller class.
// TODO: Class for parsing input into groups.
// TODO: Class for merging input.
// TODO: Date input with default to today.
// TODO: Class for copying output to clipboard.
// TODO: Help documentation with example. (In web.)
// TODO: Styling.

initialize();

function initialize() {
    document.getElementById('btn-merge')?.addEventListener('click', eventHandler_MergeButton);
    document.getElementById('btn-copy')?.addEventListener('click', eventHandler_CopyButton);
}

function eventHandler_MergeButton() {
    // TODO: Implement merge functionality.
    console.log('Merge button clicked.');
}

function eventHandler_CopyButton() {
    // TODO: Implement copy to clipboard functionality.
    console.log('Copy button clicked.');
}