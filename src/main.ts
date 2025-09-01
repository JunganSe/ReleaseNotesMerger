// TODO: Controller class.
// TODO: Class for parsing input into groups.
// TODO: Class for merging input.
// TODO: Date input with default to today.
// TODO: Class for copying output to clipboard.
// TODO: Help documentation with example. (In web.)
// TODO: Styling.

import { EventHandlers } from "./events.js";

initialize();

function initialize() {
    document.getElementById('btn-merge')?.addEventListener('click', EventHandlers.click_MergeButton);
    document.getElementById('btn-copy')?.addEventListener('click', EventHandlers.click_CopyButton);
}