type CopyToClipboardResult = "success" | "error";

const copyToClipboard = async (
  text: string
): Promise<CopyToClipboardResult> => {
  if (!text) {
    console.warn("Called copyToClipboard() with empty text");
    return "error";
  }

  try {
    await navigator.clipboard.writeText(text);
    return "success";
  } catch (err) {
    console.error("Failed to copy: ", err);
    return "error";
  }
};

export { copyToClipboard };
export type { CopyToClipboardResult };
