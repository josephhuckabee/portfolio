"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  let modalBackdrop;
  let openModal = () => {};
  let closeModal = () => {};

  const markActiveNav = () => {
    const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
    document.querySelectorAll("nav a").forEach((link) => {
      const href = link.getAttribute("href") || "";
      const linkPath = new URL(href, window.location.origin).pathname.replace(/\/$/, "") || "/";
      const isCurrent = linkPath === currentPath;
      if (isCurrent) {
        link.classList.add("is-current");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("is-current");
        link.removeAttribute("aria-current");
      }
    });
  };

  const applyTheme = (theme) => {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  };

  const updateThemeToggleLabel = () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    themeToggle.textContent = isDark ? "🌚" : "🌞";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  };

  if (storedTheme === "dark" || storedTheme === "light") {
    applyTheme(storedTheme);
  } else {
    applyTheme(prefersDark.matches ? "dark" : "light");
  }

  markActiveNav();

  prefersDark.addEventListener("change", (event) => {
    const current = localStorage.getItem("theme");
    if (!current) {
      applyTheme(event.matches ? "dark" : "light");
      applyModalTheme();
    }
  });

  let themeToggle = document.querySelector(".theme-toggle");
  if (!themeToggle) {
    themeToggle = document.createElement("button");
    themeToggle.type = "button";
    themeToggle.className = "theme-toggle";
    document.body.appendChild(themeToggle);
  }
  updateThemeToggleLabel();

  themeToggle.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
    updateThemeToggleLabel();
    const isMobileNow = window.matchMedia("(max-width: 640px)").matches;
    applyNavMode(isMobileNow, !isMobileNow && window.scrollY > 24);
    applyModalTheme();
  });
  // Select all cards with the class 'card'
  const cards = document.querySelectorAll('.card');

  // Loop through each card to set accessibility attributes and add event listeners
  cards.forEach((card) => {
    card.setAttribute('role', 'button');
    card.tabIndex = 0;
    card.setAttribute('aria-expanded', 'false');

    const toggleCardBody = () => {
      const cardBody = card.querySelector('.card-body');
      if (cardBody) {
        cardBody.classList.toggle('hidden');
        const isExpanded = !cardBody.classList.contains('hidden');
        card.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      }
    };

    card.addEventListener('click', () => {
      toggleCardBody();
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleCardBody();
      }
    });
  });

  const navs = document.querySelectorAll("nav");
  const mobileQuery = window.matchMedia("(max-width: 800px)");
  const desktopNavQuery = window.matchMedia("(min-width: 801px)");
  let navBackdrop;

  const setupMobileNav = (nav) => {
    const header = nav.closest("header") || nav.parentElement;
    const menuList = nav.querySelector("ul");
    if (!menuList) return null;

    let toggle = nav.querySelector(".js-mobile-toggle");
    if (!toggle) {
      toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "js-mobile-toggle";
      toggle.textContent = "Menu";
      toggle.setAttribute("aria-expanded", "false");

      const menuId = menuList.id || `nav-menu-${Math.random().toString(36).slice(2)}`;
      menuList.id = menuId;
      toggle.setAttribute("aria-controls", menuId);

      nav.insertBefore(toggle, menuList);
    }

    const setOpen = (isOpen) => {
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuList.style.display = isOpen ? "flex" : "none";
      menuList.setAttribute("aria-hidden", isOpen ? "false" : "true");
      if (navBackdrop) {
        navBackdrop.style.display = isOpen ? "block" : "none";
        navBackdrop.setAttribute("aria-hidden", isOpen ? "false" : "true");
      }
      if (header) {
        header.style.paddingBottom = isOpen ? "0.75rem" : "0";
      }
      if (isOpen && modalBackdrop && modalBackdrop.style.display === "flex") {
        closeModal();
      }
    };

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!isOpen);
    });

    let contactBtn = header ? header.querySelector(".js-contact-btn") : null;
    if (header && !contactBtn) {
      contactBtn = document.createElement("a");
      contactBtn.className = "js-contact-btn";
      contactBtn.href = "#contact";
      contactBtn.textContent = "Contact";
      contactBtn.setAttribute("aria-label", "Quick contact");
      nav.insertBefore(contactBtn, menuList);
    }

    return { toggle, menuList, setOpen, contactBtn, nav, header };
  };

  const mobileNavs = Array.from(navs)
    .map(setupMobileNav)
    .filter(Boolean);

  navBackdrop = document.createElement("div");
  navBackdrop.className = "js-nav-backdrop";
  navBackdrop.setAttribute("aria-hidden", "true");
  navBackdrop.style.position = "fixed";
  navBackdrop.style.inset = "0";
  navBackdrop.style.background = "rgba(0, 0, 0, 0.9)";
  navBackdrop.style.backdropFilter = "blur(2px)";
  navBackdrop.style.display = "none";
  navBackdrop.style.zIndex = "1500";
  document.body.appendChild(navBackdrop);

  navBackdrop.addEventListener("click", () => {
    closeMenus();
  });

  const closeMenus = () => {
    mobileNavs.forEach(({ toggle, setOpen }) => {
      if (toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
      }
    });
  };

  const applyMenuTheme = (menuList) => {
    const isDark = root.getAttribute("data-theme") === "dark";
    if (isDark) {
      menuList.style.background = "#111";
      menuList.style.color = "#fff";
      menuList.style.border = "1px solid #333";
      menuList.style.boxShadow = "0 20px 60px rgba(0,0,0,0.5)";
    } else {
      menuList.style.background = "whitesmoke";
      menuList.style.color = "#1a1a1a";
      menuList.style.border = "1px solid rgba(0, 0, 0, 0.12)";
      menuList.style.boxShadow = "0 20px 60px rgba(0,0,0,0.25)";
    }
  };

  const applyNavMode = (isMobile, isCompactDesktop = false) => {
    mobileNavs.forEach(({ toggle, menuList, setOpen, contactBtn, nav, header }) => {
      if (header) {
        header.style.display = "flex";
        header.style.flexDirection = "column";
        header.style.alignItems = "center";
        header.style.gap = "0.75rem";
      }
      if (nav) {
        nav.style.width = "100%";
        nav.style.display = "flex";
        nav.style.justifyContent = "center";
        nav.style.alignItems = "center";
      }
        if (isMobile || isCompactDesktop) {
          toggle.style.display = "inline-flex";
        toggle.style.alignItems = "center";
        toggle.style.justifyContent = "center";
        toggle.style.gap = "0.5rem";
        toggle.style.padding = "0.5rem 1rem";
        toggle.style.minWidth = "112px";
        toggle.style.height = "36px";
        toggle.style.fontFamily = "inherit";
        toggle.style.fontSize = "1rem";
        toggle.style.fontWeight = "600";
        const isDarkTheme = root.getAttribute("data-theme") === "dark";
        toggle.style.border = isDarkTheme ? "1px solid rgba(255, 255, 255, 0.18)" : "1px solid rgba(0, 0, 0, 0.12)";
        toggle.style.background = isDarkTheme ? "rgba(15, 15, 18, 0.75)" : "rgba(255, 255, 255, 0.85)";
        toggle.style.color = isDarkTheme ? "#fff" : "#111";
        toggle.style.borderRadius = "999px";
        toggle.style.boxShadow = "0 10px 24px rgba(0,0,0,0.12)";
        toggle.style.cursor = "pointer";
        toggle.style.margin = "0";

        menuList.style.flexDirection = "column";
        menuList.style.alignItems = "center";
        menuList.style.width = "min(520px, 92vw)";
        applyMenuTheme(menuList);
        menuList.style.borderRadius = "10px";
        menuList.style.padding = "1.25rem";
        menuList.style.position = "fixed";
        menuList.style.left = "50%";
        menuList.style.top = "50%";
        menuList.style.transform = "translate(-50%, -50%)";
        menuList.style.zIndex = "2100";
        if (isCompactDesktop) {
          const isOpen = toggle.getAttribute("aria-expanded") === "true";
          menuList.style.display = isOpen ? "flex" : "none";
          menuList.setAttribute("aria-hidden", isOpen ? "false" : "true");
        } else {
          setOpen(false);
        }

        if (contactBtn) {
          contactBtn.style.display = "inline-flex";
          contactBtn.style.alignItems = "center";
          contactBtn.style.justifyContent = "center";
          contactBtn.style.padding = "0.5rem 1rem";
          contactBtn.style.minWidth = "112px";
          contactBtn.style.height = "36px";
          contactBtn.style.fontFamily = "inherit";
          contactBtn.style.fontSize = "1rem";
          contactBtn.style.fontWeight = "600";
          contactBtn.style.border = isDarkTheme ? "1px solid rgba(255, 255, 255, 0.18)" : "1px solid rgba(0, 0, 0, 0.12)";
          contactBtn.style.background = isDarkTheme ? "rgba(15, 15, 18, 0.75)" : "rgba(255, 255, 255, 0.85)";
          contactBtn.style.color = isDarkTheme ? "#fff" : "#111";
          contactBtn.style.borderRadius = "999px";
          contactBtn.style.boxShadow = "0 10px 24px rgba(0,0,0,0.12)";
          contactBtn.style.textDecoration = "none";
          contactBtn.style.margin = "0";
        }

        nav.style.gap = "0.75rem";
        nav.style.flexWrap = "wrap";
        nav.style.padding = "0.9rem 0.75rem";
        nav.style.background = "transparent";
        nav.style.justifyContent = "center";
        nav.style.width = "fit-content";
        nav.style.margin = "0 auto";

        toggle.style.order = "0";
        if (contactBtn) contactBtn.style.order = "1";
        menuList.style.order = "2";
      } else {
        toggle.style.display = "none";
        menuList.style.display = "flex";
        menuList.style.flexDirection = "";
        menuList.style.alignItems = "";
        menuList.style.width = "";
        menuList.style.background = "transparent";
        menuList.style.color = "";
        menuList.style.border = "";
        menuList.style.borderRadius = "";
        menuList.style.padding = "";
        menuList.style.boxShadow = "";
        menuList.style.position = "";
        menuList.style.left = "";
        menuList.style.top = "";
        menuList.style.transform = "";
        menuList.style.zIndex = "";
        toggle.setAttribute("aria-expanded", "false");
        if (contactBtn) {
          contactBtn.style.display = "none";
        }
        if (header) {
          header.style.display = "";
          header.style.flexDirection = "";
          header.style.alignItems = "";
          header.style.gap = "";
        }
        if (nav) {
          nav.style.width = "";
          nav.style.display = "";
          nav.style.justifyContent = "";
          nav.style.alignItems = "";
          nav.style.gap = "";
          nav.style.flexWrap = "";
          nav.style.padding = "";
          nav.style.background = "transparent";
        }
      }
    });
  };

  // Contact modal (JS-only)
  let applyModalTheme = () => {};
  modalBackdrop = document.querySelector(".js-contact-backdrop");
  if (!modalBackdrop) {
    modalBackdrop = document.createElement("div");
    modalBackdrop.className = "js-contact-backdrop";
    modalBackdrop.setAttribute("aria-hidden", "true");
    modalBackdrop.style.position = "fixed";
    modalBackdrop.style.inset = "0";
    modalBackdrop.style.background = "rgba(0, 0, 0, 0.9)";
    modalBackdrop.style.display = "none";
    modalBackdrop.style.alignItems = "center";
    modalBackdrop.style.justifyContent = "center";
    modalBackdrop.style.padding = "1.5rem";
    modalBackdrop.style.zIndex = "2000";

    const modal = document.createElement("div");
    modal.className = "js-contact-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "contact-modal-title");
    modal.style.width = "min(520px, 92vw)";
    modal.style.borderRadius = "10px";
    modal.style.padding = "1.25rem";

    modal.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem;">
        <h2 id="contact-modal-title" style="margin:0;font-size:1.4rem;">Quick Contact</h2>
        <button type="button" class="js-contact-close" aria-label="Close" style="border-radius:6px;padding:0.25rem 0.5rem;cursor:pointer;">✕</button>
      </div>
      <form name="contact" action="/api/contact" method="POST" style="display:grid;gap:0.75rem;margin-top:1rem;">
        <input type="text" name="website" autocomplete="off" tabindex="-1" aria-hidden="true" style="position:absolute;left:-9999px;">
        <label style="font-weight:600;">Name
          <input name="name" type="text" required style="margin-top:0.35rem;width:100%;padding:0.55rem 0.7rem;border-radius:4px;">
        </label>
        <label style="font-weight:600;">Email
          <input name="email" type="email" required style="margin-top:0.35rem;width:100%;padding:0.55rem 0.7rem;border-radius:4px;">
        </label>
        <label style="font-weight:600;">Message
          <textarea name="message" rows="4" required style="margin-top:0.35rem;width:100%;padding:0.55rem 0.7rem;border-radius:4px;"></textarea>
        </label>
        <button type="submit" style="justify-self:start;padding:0.55rem 1rem;border:0;border-radius:4px;font-weight:700;cursor:pointer;">Send</button>
      </form>
    `;

    modalBackdrop.appendChild(modal);
    document.body.appendChild(modalBackdrop);

    applyModalTheme = () => {
      const isDark = root.getAttribute("data-theme") === "dark";
      modal.style.background = isDark ? "#111" : "whitesmoke";
      modal.style.color = isDark ? "#fff" : "#000";
      modal.style.border = isDark ? "1px solid #333" : "1px solid rgba(0,0,0,0.12)";
      modal.style.boxShadow = isDark ? "0 20px 60px rgba(0,0,0,0.5)" : "0 20px 60px rgba(0,0,0,0.25)";

      const closeBtn = modal.querySelector(".js-contact-close");
      if (closeBtn) {
        closeBtn.style.background = isDark ? "#111" : "whitesmoke";
        closeBtn.style.border = isDark ? "1px solid #333" : "1px solid rgba(0,0,0,0.12)";
        closeBtn.style.color = isDark ? "#fff" : "#000";
      }

      modal.querySelectorAll("input, textarea").forEach((field) => {
        field.style.border = isDark ? "1px solid #333" : "1px solid rgba(0,0,0,0.2)";
        field.style.background = isDark ? "#0b0b0b" : "#ffffff";
        field.style.color = isDark ? "#fff" : "#000";
      });

      const submitBtn = modal.querySelector("button[type=\"submit\"]");
      if (submitBtn) {
        submitBtn.style.background = "#c96b3c";
        submitBtn.style.color = "#111";
      }
    };

    applyModalTheme();

    modalBackdrop.addEventListener("click", (event) => {
      const target = event.target;
      if (target && target.closest("input, textarea, select, button, a")) {
        return;
      }
      closeModal();
    });

    modal.querySelector(".js-contact-close").addEventListener("click", () => {
      closeModal();
    });
  }

  openModal = () => {
    closeMenus();
    modalBackdrop.style.display = "flex";
    modalBackdrop.setAttribute("aria-hidden", "false");
    if (navBackdrop) {
      navBackdrop.style.display = "block";
      navBackdrop.setAttribute("aria-hidden", "false");
    }
    document.body.style.overflow = "hidden";
  };

  closeModal = () => {
    modalBackdrop.style.display = "none";
    modalBackdrop.setAttribute("aria-hidden", "true");
    if (navBackdrop) {
      navBackdrop.style.display = "none";
      navBackdrop.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
  };

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!target) return;

    if (!target.closest("nav") && !target.closest(".js-mobile-toggle")) {
      closeMenus();
    }

    if (modalBackdrop && modalBackdrop.style.display === "flex") {
      if (!target.closest(".js-contact-modal") && !target.closest(".js-contact-btn")) {
        closeModal();
      }
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modalBackdrop.style.display === "flex") {
      closeModal();
    }
  });

  const projectTriggers = document.querySelectorAll(".js-project-open");
  const projectModals = document.querySelectorAll(".project-modal");

  const closeProjectModal = (modal) => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  projectTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const targetId = trigger.getAttribute("data-modal-target");
      const modal = document.getElementById(targetId);
      if (!modal) return;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  projectModals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target.matches("[data-modal-close]")) {
        closeProjectModal(modal);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      projectModals.forEach((modal) => {
        if (modal.classList.contains("is-open")) {
          closeProjectModal(modal);
        }
      });
    }
  });

  document.querySelectorAll(".js-contact-btn").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    });
  });

  const contactForm = document.querySelector("form[name=\"contact\"]");
  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      let notice = contactForm.querySelector(".form-notice");
      if (!notice) {
        notice = document.createElement("p");
        notice.className = "form-notice";
        notice.setAttribute("role", "status");
        notice.style.marginTop = "0.75rem";
        notice.style.fontWeight = "600";
        contactForm.appendChild(notice);
      }
      notice.textContent = "Sending...";
      try {
        const formData = new FormData(contactForm);
        const action = contactForm.getAttribute("action") || window.location.pathname;
        const response = await fetch(action, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString()
        });
        if (response.ok) {
          notice.textContent = "Thanks! Your message has been submitted.";
          contactForm.reset();
        } else {
          notice.textContent = "Sorry, something went wrong. Please try again.";
        }
      } catch (error) {
        notice.textContent = "Sorry, something went wrong. Please try again.";
      }
    });
  }

  const modalForm = document.querySelector(".js-contact-modal form");
  if (modalForm) {
    modalForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      let notice = modalForm.querySelector(".form-notice");
      if (!notice) {
        notice = document.createElement("p");
        notice.className = "form-notice";
        notice.setAttribute("role", "status");
        notice.style.marginTop = "0.75rem";
        notice.style.fontWeight = "600";
        modalForm.appendChild(notice);
      }
      notice.textContent = "Sending...";
      try {
        const formData = new FormData(modalForm);
        const action = modalForm.getAttribute("action") || window.location.pathname;
        const response = await fetch(action, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString()
        });
        if (response.ok) {
          notice.textContent = "Thanks! Your message has been submitted.";
          modalForm.reset();
        } else {
          notice.textContent = "Sorry, something went wrong. Please try again.";
        }
      } catch (error) {
        notice.textContent = "Sorry, something went wrong. Please try again.";
      }
    });
  }

  const heroTitle = document.querySelector(".heroTitle");
  if (heroTitle) {
    const fonts = [
      "'Space Grotesk', sans-serif",
      "'Plus Jakarta Sans', sans-serif",
      "'Fraunces', serif",
      "'Playfair Display', serif",
      "'Merriweather', serif"
    ];
    let fontIndex = 0;
    setInterval(() => {
      fontIndex = (fontIndex + 1) % fonts.length;
      heroTitle.style.fontFamily = fonts[fontIndex];
    }, 2000);
  }

  const isMobile = () => mobileQuery.matches;
  const isCompactDesktop = () => false;

  applyNavMode(isMobile(), isCompactDesktop());
  mobileQuery.addEventListener("change", (event) => {
    applyNavMode(event.matches, isCompactDesktop());
  });

  const updateStickyHeader = () => {
    const header = document.querySelector("header");
    if (!header) return;
    const shouldStick = desktopNavQuery.matches && window.scrollY > 8;
    header.classList.toggle("is-stuck", shouldStick);
  };

  updateStickyHeader();
  desktopNavQuery.addEventListener("change", updateStickyHeader);
  window.addEventListener("scroll", updateStickyHeader);
});
