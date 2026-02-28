type FullscreenCapableElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

type FullscreenCapableDocument = Document & {
  webkitFullscreenElement?: Element | null;
};

export async function requestGameFullscreen() {
  const fullscreenDocument = document as FullscreenCapableDocument;

  if (document.fullscreenElement || fullscreenDocument.webkitFullscreenElement) {
    return true;
  }

  const targetElement = document.documentElement as FullscreenCapableElement;

  try {
    if (typeof targetElement.requestFullscreen === "function") {
      await targetElement.requestFullscreen();
      return true;
    }

    if (typeof targetElement.webkitRequestFullscreen === "function") {
      await Promise.resolve(targetElement.webkitRequestFullscreen());
      return true;
    }
  } catch {
    return false;
  }

  return false;
}
