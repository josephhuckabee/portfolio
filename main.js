"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const mobileQuery = window.matchMedia("(max-width: 800px)");
  const desktopQuery = window.matchMedia("(min-width: 801px)");
  const focusableSelector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "textarea:not([disabled])",
    "select:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
  ].join(",");

  let activeDialog = null;
  let activeTrigger = null;

  const applyTheme = (theme) => {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  };

  const getTheme = () => root.getAttribute("data-theme") === "dark" ? "dark" : "light";

  const storedTheme = localStorage.getItem("theme");
  applyTheme(storedTheme === "dark" || storedTheme === "light" ? storedTheme : (prefersDark.matches ? "dark" : "light"));

  const themeToggle = document.querySelector(".theme-toggle") || document.createElement("button");
  if (!themeToggle.classList.contains("theme-toggle")) {
    themeToggle.type = "button";
    themeToggle.className = "theme-toggle";
    document.body.appendChild(themeToggle);
  }

  const updateThemeToggle = () => {
    const isDark = getTheme() === "dark";
    themeToggle.textContent = isDark ? "Light" : "Dark";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  };

  updateThemeToggle();

  themeToggle.addEventListener("click", () => {
    const nextTheme = getTheme() === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    updateThemeToggle();
  });

  prefersDark.addEventListener("change", (event) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(event.matches ? "dark" : "light");
      updateThemeToggle();
    }
  });

  const markActiveNav = () => {
    const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
    document.querySelectorAll("nav a").forEach((link) => {
      const url = new URL(link.getAttribute("href") || "/", window.location.origin);
      const linkPath = url.pathname.replace(/\/$/, "") || "/";
      const isCurrent = linkPath === currentPath;
      link.classList.toggle("is-current", isCurrent);
      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  markActiveNav();

  const closeMobileMenus = () => {
    document.querySelectorAll(".js-mobile-toggle[aria-expanded='true']").forEach((toggle) => {
      toggle.setAttribute("aria-expanded", "false");
      const menu = document.getElementById(toggle.getAttribute("aria-controls"));
      if (menu) menu.setAttribute("aria-hidden", "true");
    });
    document.body.classList.remove("nav-open");
  };

  document.querySelectorAll("nav").forEach((nav, index) => {
    const menu = nav.querySelector("ul");
    if (!menu) return;

    const menuId = menu.id || `main-menu-${index}`;
    menu.id = menuId;

    let toggle = nav.querySelector(".js-mobile-toggle");
    if (!toggle) {
      toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "js-mobile-toggle";
      toggle.textContent = "Menu";
      nav.insertBefore(toggle, menu);
    }
    toggle.setAttribute("aria-controls", menuId);
    toggle.setAttribute("aria-expanded", "false");

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      closeMobileMenus();
      toggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
      menu.setAttribute("aria-hidden", isOpen ? "true" : "false");
      document.body.classList.toggle("nav-open", !isOpen);
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenus);
    });
  });

  const applyNavState = () => {
    document.body.classList.toggle("is-mobile-nav", mobileQuery.matches);
    document.querySelectorAll("nav ul").forEach((menu) => {
      menu.setAttribute("aria-hidden", mobileQuery.matches ? "true" : "false");
    });
    if (!mobileQuery.matches) closeMobileMenus();
  };

  applyNavState();
  mobileQuery.addEventListener("change", applyNavState);

  const updateStickyHeader = () => {
    const header = document.querySelector("header");
    if (header) {
      header.classList.toggle("is-stuck", desktopQuery.matches && window.scrollY > 8);
    }
  };

  updateStickyHeader();
  desktopQuery.addEventListener("change", updateStickyHeader);
  window.addEventListener("scroll", updateStickyHeader, { passive: true });

  const getFocusable = (dialog) => Array.from(dialog.querySelectorAll(focusableSelector))
    .filter((element) => element.offsetParent !== null);

  const openDialog = (modal, trigger) => {
    if (!modal) return;
    closeMobileMenus();
    if (activeDialog && activeDialog !== modal) closeDialog(activeDialog);
    activeDialog = modal;
    activeTrigger = trigger || document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const dialog = modal.querySelector("[role='dialog']");
    if (dialog) dialog.focus({ preventScroll: true });
  };

  const closeDialog = (modal = activeDialog) => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    if (activeDialog === modal) activeDialog = null;
    document.body.classList.remove("modal-open");
    if (activeTrigger && typeof activeTrigger.focus === "function") {
      activeTrigger.focus({ preventScroll: true });
    }
    activeTrigger = null;
  };

  document.querySelectorAll(".js-project-open").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openDialog(document.getElementById(trigger.dataset.modalTarget), trigger);
    });
  });

  document.querySelectorAll(".project-modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target.closest("[data-modal-close]")) {
        closeDialog(modal);
      }
    });
  });

  const contactModal = document.createElement("div");
  contactModal.className = "project-modal contact-modal";
  contactModal.setAttribute("aria-hidden", "true");
  contactModal.innerHTML = `
    <div class="project-modal__backdrop" data-modal-close></div>
    <section class="project-modal__content contact-modal__content" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" tabindex="-1">
      <button class="project-modal__close" type="button" data-modal-close aria-label="Close contact form">Close</button>
      <p class="eyebrow">Quick contact</p>
      <h2 id="contact-modal-title">Tell me what you are building.</h2>
      <form name="contact" action="/api/contact" method="POST" class="contact-modal__form">
        <input type="text" name="website" autocomplete="off" tabindex="-1" aria-hidden="true" class="honeypot">
        <label>Name <input name="name" type="text" required autocomplete="name"></label>
        <label>Email <input name="email" type="email" required autocomplete="email"></label>
        <label>Message <textarea name="message" rows="4" required></textarea></label>
        <button type="submit">Send</button>
      </form>
    </section>
  `;
  document.body.appendChild(contactModal);
  contactModal.addEventListener("click", (event) => {
    if (event.target.closest("[data-modal-close]")) {
      closeDialog(contactModal);
    }
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href], .js-contact-btn");
    if (!link) return;

    const href = link.getAttribute("href") || "";
    const isContactLink = link.classList.contains("js-contact-btn") || href === "#contact";

    if (!isContactLink) return;

    event.preventDefault();
    openDialog(contactModal, link);
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest("nav")) closeMobileMenus();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenus();
      closeDialog();
      return;
    }

    if (event.key !== "Tab" || !activeDialog) return;
    const dialog = activeDialog.querySelector("[role='dialog']");
    const focusable = dialog ? getFocusable(dialog) : [];
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const handleContactForm = (form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      let notice = form.querySelector(".form-notice");
      if (!notice) {
        notice = document.createElement("p");
        notice.className = "form-notice";
        notice.setAttribute("role", "status");
        form.appendChild(notice);
      }

      notice.textContent = "Sending...";
      try {
        const response = await fetch(form.getAttribute("action") || "/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(new FormData(form)).toString()
        });
        notice.textContent = response.ok ? "Thanks. Your message has been submitted." : "Something went wrong. Please try again.";
        if (response.ok) form.reset();
      } catch (error) {
        notice.textContent = "Something went wrong. Please try again.";
      }
    });
  };

  document.querySelectorAll('form[name="contact"]').forEach(handleContactForm);
});
