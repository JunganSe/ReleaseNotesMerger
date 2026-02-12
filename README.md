# Release notes merger
A tool used to combine release notes that are formatted in a specific format.\
Primarily used to consolidate release notes from a staging environment into a production release.

Available on [Github pages](https://junganse.github.io/ReleaseNotesMerger/).

# Features
- Combines content of paragraphs into groups by treating the first line of each paragraph as a heading.
  - Each empty or whitespace-only line denotes a new paragraph.
  - Single-line paragraphs are ignores, as they would be a heading with no content.
- Optionally:
  - Inserts a line containing a date and prefix. Defaults to using the current date.
  - Ignores lines starting with a specified string.
  - Orders the combined paragraphs by heading.
  - Adjusts indentation of indented lines by a multiplier.
  - Treats headings that only differ in casing as the same. Prefers headings defined in "Heading order" if applicable.
  - Auto copy to clipboard.
- Save and load settings.
- Horizontal/vertical layout, or automatic.

Please note that the UI is a WIP, but the core functionality is complete.

# Example
Usage and text format example:
<img width="1187" height="1018" alt="image" src="https://github.com/user-attachments/assets/f5a6db3f-6ff7-4ef7-9645-15adee6c7d1a" />
