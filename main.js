(() => {
  const translations = window.siteContent || {};

  const detectLanguage = () => {
    const lang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    return lang.startsWith("pl") ? "pl" : "en";
  };

  const getCopy = () => {
    const langKey = detectLanguage();
    document.documentElement.lang = langKey;
    return translations[langKey] || translations.en || {};
  };

  const buildBio = (target, paragraphs) => {
    if (!target || !paragraphs) return;
    target.innerHTML = "";
    paragraphs.forEach((text) => {
      const p = document.createElement("p");
      p.innerHTML = text;
      target.appendChild(p);
    });
  };

  const setupMarquee = (marquee, track, text) => {
    if (!marquee || !track) return;
    const content = text?.trim() || "";
    track.textContent = "";

    const createItem = () => {
      const span = document.createElement("span");
      span.className = "marquee-item";
      span.textContent = content;
      return span;
    };

    track.append(createItem(), createItem());

    const ensureFill = () => {
      const targetWidth = marquee.clientWidth * 2;
      while (track.scrollWidth < targetWidth) {
        track.append(createItem());
      }
    };

    const setDuration = () => {
      const pixelsPerSecond = 80;
      const duration = Math.max(track.scrollWidth / pixelsPerSecond, 10);
      track.style.animationDuration = `${duration.toFixed(2)}s`;
    };

    ensureFill();
    setDuration();

    window.addEventListener("resize", () => {
      ensureFill();
      setDuration();
    });
  };

  const setupBio = (section, copy) => {
    const bioContent = section?.querySelector("[data-bio-content]");
    const bioToggle = section?.querySelector("[data-bio-toggle]");
    if (!bioContent || !bioToggle) return;

    buildBio(bioContent, copy.bioParagraphs);

    let fullHeight = 0;
    let collapsedHeight = 0;

    const computeHeights = () => {
      bioContent.style.maxHeight = "unset";
      fullHeight = bioContent.scrollHeight;
      collapsedHeight = Math.max(fullHeight / 2, 140);
    };

    const applyCollapsed = () => {
      section.dataset.state = "collapsed";
      bioContent.classList.add("is-collapsed");
      bioContent.style.maxHeight = `${collapsedHeight}px`;
      bioToggle.textContent = copy.readMore || "Read more";
    };

    const applyExpanded = () => {
      section.dataset.state = "expanded";
      bioContent.classList.remove("is-collapsed");
      bioContent.style.maxHeight = `${fullHeight}px`;
      bioToggle.textContent = copy.readLess || "Read less";
    };

    computeHeights();
    applyCollapsed();

    bioToggle.addEventListener("click", () => {
      const isCollapsed = section.dataset.state !== "expanded";
      if (isCollapsed) {
        applyExpanded();
      } else {
        applyCollapsed();
      }
    });

    window.addEventListener("resize", () => {
      const isExpanded = section.dataset.state === "expanded";
      computeHeights();
      if (isExpanded) {
        applyExpanded();
      } else {
        applyCollapsed();
      }
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const bgUrl = body?.dataset?.bg;
    if (bgUrl) {
      const preloadImage = new Image();
      const finishLoading = () => {
        body.classList.remove("is-loading");
      };
      preloadImage.onload = finishLoading;
      preloadImage.onerror = finishLoading;
      preloadImage.src = bgUrl;
    } else if (body) {
      body.classList.remove("is-loading");
    }

    const copy = getCopy();

    const marquee = document.querySelector("[data-marquee]");
    const track = marquee?.querySelector("[data-marquee-text]");
    if (copy.marquee && marquee && track) {
      setupMarquee(marquee, track, copy.marquee);
    }

    const bioSection = document.querySelector("[data-bio]");
    if (bioSection) {
      setupBio(bioSection, copy);
    }
  });
})();
