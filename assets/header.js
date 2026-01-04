class HeaderComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.resizeObserver.observe(this);
    this.stickyMode = this.getAttribute("data-sticky-type");
    this.offscreen = false;

    this.menuDrawerHiddenWidth = null;
    this.intersectionObserver = null;
    this.lastScrollTop = 0;

    this.timeout = null;
    this.animationDelay = 150;
    // this.setHeaderHeight();

    // Add blur effect for sticky header
    this.addBlurEffect();

    if (this.stickyMode) {
      this.observeStickyPosition(this.stickyMode === "always");

      if (this.stickyMode === "scroll-up" || this.stickyMode === "always") {
        // document.addEventListener("scroll", this.handleWindowScroll.bind(this));
        document.addEventListener("scroll", theme.utils.rafThrottle(this.handleWindowScroll.bind(this)));
      }
    }
  }

  disconnectedCallback() {
    this.resizeObserver.disconnect();
    this.intersectionObserver?.disconnect();
    document.removeEventListener("scroll", this.handleWindowScroll.bind(this));
    document.body.style.setProperty("--header-height", "0px");
  }

  // setHeaderHeight() {
  //   const { height } = this.getBoundingClientRect();
  //   document.body.style.setProperty('--header-height', `${height}px`);

  // }

  resizeObserver = new ResizeObserver(([entry]) => {
    if (!entry) return;
    cancelAnimationFrame(this._resizeRaf);
    this._resizeRaf = requestAnimationFrame(() => {
      const { height } = entry.target.getBoundingClientRect();
      document.body.style.setProperty("--header-height", `${height}px`);
    });
  });

  observeStickyPosition(alwaysSticky = true) {
    if (this.intersectionObserver) return;

    const config = {
      threshold: alwaysSticky ? 1 : 0,
    };

    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      if (!entry) return;

      const { isIntersecting } = entry;

      if (alwaysSticky) {
        this.dataset.stickyState = isIntersecting ? "inactive" : "active";
      } else {
        this.offscreen =
          !isIntersecting || this.dataset.stickyState === "active";
      }
    }, config);

    this.intersectionObserver.observe(this);
  }

  handleWindowScroll() {
    if (!this.offscreen && this.stickyMode !== "always") return;

    const scrollTop = document.scrollingElement?.scrollTop ?? 0;
    const isScrollingUp = scrollTop < this.lastScrollTop;

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    if (this.stickyMode === "always") {
      const isAtTop = this.getBoundingClientRect().top >= 0;

      if (isAtTop) {
        this.dataset.scrollDirection = "none";
      } else if (isScrollingUp) {
        this.dataset.scrollDirection = "up";
      } else {
        this.dataset.scrollDirection = "down";
      }

      this.lastScrollTop = scrollTop;
      return;
    }

    if (isScrollingUp) {
      this.removeAttribute("data-animating");

      if (this.getBoundingClientRect().top >= 0) {
        // reset sticky state when header is scrolled up to natural position
        this.offscreen = false;
        this.dataset.stickyState = "inactive";
        this.dataset.scrollDirection = "none";
      } else {
        // show sticky header when scrolling up
        this.dataset.stickyState = "active";
        this.dataset.scrollDirection = "up";
      }
    } else if (this.dataset.stickyState === "active") {
      this.dataset.scrollDirection = "none";
      // delay transitioning to idle hidden state for hiding animation
      this.setAttribute("data-animating", "");

      this.timeout = setTimeout(() => {
        this.dataset.stickyState = "idle";
        this.removeAttribute("data-animating");
      }, this.animationDelay);
    } else {
      this.dataset.scrollDirection = "none";
      this.dataset.stickyState = "idle";
    }

    this.lastScrollTop = scrollTop;
  }

  addBlurEffect() {
    // Get settings from the section
    const enableBlur = this.getAttribute('data-enable-sticky-blur') === 'true';
    const blurIntensity = this.getAttribute('data-sticky-blur-intensity') || '15';
    const blurOpacity = this.getAttribute('data-sticky-blur-opacity') || '0.85';

    const applyBlur = () => {
      this.style.background = `rgba(255, 255, 255, ${blurOpacity})`;
      this.style.backdropFilter = `blur(${blurIntensity}px)`;
      this.style.webkitBackdropFilter = `blur(${blurIntensity}px)`;

      const rowGroup = this.querySelector('.row-group');
      if (rowGroup) {
        rowGroup.style.background = `rgba(255, 255, 255, ${blurOpacity})`;
        rowGroup.style.backdropFilter = `blur(${blurIntensity}px)`;
        rowGroup.style.webkitBackdropFilter = `blur(${blurIntensity}px)`;
      }
    };

    const clearBlur = () => {
      this.style.background = '';
      this.style.backdropFilter = '';
      this.style.webkitBackdropFilter = '';

      const rowGroup = this.querySelector('.row-group');
      if (rowGroup) {
        rowGroup.style.background = '';
        rowGroup.style.backdropFilter = '';
        rowGroup.style.webkitBackdropFilter = '';
      }
    };

    // Add blur effect when header becomes sticky
    const updateBlurEffect = () => {
      if (!enableBlur) {
        clearBlur();
        return;
      }

      const transparentMode = this.getAttribute('transparent');
      const isTransparentAlways = transparentMode === 'always';
      const isTransparentNotSticky = transparentMode === 'not-sticky';
      const scrollDirection = this.dataset.scrollDirection;
      const isScrolled = scrollDirection
        ? scrollDirection !== 'none'
        : (document.scrollingElement?.scrollTop ?? 0) > 0;
      const isStickyActive =
        this.dataset.stickyState === 'active' ||
        (this.stickyMode === 'always' && isScrolled);

      const shouldApplyBlur =
        !isTransparentAlways &&
        (!isTransparentNotSticky || isStickyActive) &&
        (this.stickyMode === 'always' || this.dataset.stickyState === 'active');

      if (shouldApplyBlur) {
        applyBlur();
        return;
      }

      clearBlur();
    };

    // Update blur effect on scroll state changes
    const observer = new MutationObserver(updateBlurEffect);
    observer.observe(this, {
      attributes: true,
      attributeFilter: ['data-sticky-state', 'data-scroll-direction', 'transparent'],
    });
    
    // Initial update
    updateBlurEffect();
  }
}

if (!customElements.get("header-component"))
  customElements.define("header-component", HeaderComponent);

function calculateHeaderGroupHeight(
  header = document.querySelector('#header-component'),
  headerGroup = document.querySelector('#header-group')
) {
  if (!headerGroup) return 0;

  let totalHeight = 0;
  const children = headerGroup.children;

  for (let i = 0; i < children.length; i++) {
    const element = children[i];
    if (element === header || !(element instanceof HTMLElement)) continue;
    totalHeight += element.offsetHeight;
  }

  // If the header is transparent and has a sibling section, add the height of the header to the total height
  if (header instanceof HTMLElement && header.hasAttribute('transparent') && !header.parentElement?.nextElementSibling) {
    return totalHeight + header.offsetHeight;
  }

  return totalHeight;
}

function updateHeaderHeights() {
  const header = document.querySelector('header-component');

  // Early exit if no header - nothing to do
  if (!(header instanceof HTMLElement)) return;

  // Calculate initial height(s
  // const headerHeight = header.offsetHeight;
  const headerGroupHeight = calculateHeaderGroupHeight(header);

  // document.body.style.setProperty('--header-height', `${headerHeight}px`);
  document.body.style.setProperty('--header-group-height', `${headerGroupHeight}px`);
}

function setheaderRowHeight() {
  const headerMenu = document.querySelector('.header__row [data-main-menu]');
  if (!headerMenu) return;

  const { height } = headerMenu.closest('.header__row').getBoundingClientRect();
  document.body.style.setProperty('--header-row-menu-height', `${height}px`);
}

if (document.readyState === "complete") {
  setheaderRowHeight();
  updateHeaderHeights();
  setheaderRowHeight();
} else {
  window.addEventListener("load", () => {
    updateHeaderHeights();
    setheaderRowHeight();
  });
}
