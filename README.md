# Release notes merger
A tool used to combine release notes that are formatted in a specific format.

# Features
- Combines content of paragraphs into groups by treating the first line of each paragraph as a heading.
  - Each empty or whitespace-only line denotes a new paragraph.
  - Single-line paragraphs are ignores, as they would be a heading with no content.
- Optionally:
  - Ignores lines starting with a specified string.
  - Orders the combined paragraphs by heading.
  - Adjusts indentation of indented lines by a multiplier.
  - Treats headings that only differ in casing as the same. Prefers headings defined in "Heading order" if applicable.
  - Auto copy to clipboard.
- Save and load settings.
- Horizontal/vertical layout, or automatic.

# Example
Usage and text format example:
<img alt="image" src="https://github.com/user-attachments/assets/ef836dbd-2eaf-4e9a-b845-dc0563add5a7" />
