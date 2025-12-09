import { ImageRefSchema } from "@jakubkanna/labguy-front-schema";
import { getLocalMediaPath } from "./mediaPaths";

// Get Image attributes based on local uploads
export function getImageAttributes(image: ImageRefSchema) {
  const localPath = getLocalMediaPath(
    image.path as string | undefined,
    image.cld_url as string | undefined,
    image.public_id as string | undefined
  );

  const fallbackPath =
    !localPath && image.filename && image.format
      ? `${import.meta.env.BASE_URL || "/"}uploads/images/${image.filename}.${
          image.format
        }`
      : "";

  return {
    src: localPath || fallbackPath,
    srcSet: "",
    sizes: "",
    alt: image.description || "",
  };
}
export interface Padding {
  paddingTop: number;
  paddingBottom: number;
}

export const getPadding = (): Padding => {
  const getElementHeight = (element: HTMLElement | null): number => {
    if (!element) return 0;

    const style = window.getComputedStyle(element);
    return (
      element.clientHeight +
      parseFloat(style.marginTop) +
      parseFloat(style.marginBottom) +
      parseFloat(style.paddingTop) +
      parseFloat(style.paddingBottom)
    );
  };

  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  return {
    paddingTop: getElementHeight(header),
    paddingBottom: getElementHeight(footer),
  };
};
