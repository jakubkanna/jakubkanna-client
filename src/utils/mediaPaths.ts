const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");

const extractUploadsPath = (input?: string | null) => {
  if (!input) return undefined;

  // Absolute file system path
  if (input.includes("/uploads/")) {
    const idx = input.indexOf("/uploads/");
    return input.slice(idx).replace(/^\/+/, "");
  }

  // URL with uploads path
  try {
    const url = new URL(input);
    if (url.pathname.includes("/uploads/")) {
      return url.pathname.replace(/^\/+/, "");
    }
  } catch {
    // Not a URL, ignore
  }

  return undefined;
};

/**
 * Returns the first value that can be mapped to a local uploads path.
 */
export const getLocalMediaPath = (
  ...inputs: Array<string | null | undefined>
) => {
  for (const input of inputs) {
    const path = extractUploadsPath(input || undefined);
    if (path) return base + path;
  }
  return undefined;
};
