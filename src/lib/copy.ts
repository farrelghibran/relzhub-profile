import { notify } from "./notify";

export function copyContent(content: string) {
  try {
    navigator.clipboard.writeText(content);
    console.log("Content copied to clipboard");
    notify("Copied!");
  } catch (err) {
    notify("Failed to copy!");
  }
}
