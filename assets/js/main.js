document.addEventListener("DOMContentLoaded", () => {
  // 1. SCROLL REVEAL ANIMATION
  const reveals = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add("active");
      }
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // 2. BACK TO TOP BUTTON
  const backBtn = document.getElementById("backToTop");
  if (backBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backBtn.style.display = "flex";
      } else {
        backBtn.style.display = "none";
      }
    });
    backBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 3. NAVBAR SCROLL EFFECT
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  });

  // 4. CHECK LANGUAGE
  const currentCookie = getCookie("googtrans");
  updateLanguageUI(currentCookie);

  // 5. JALANKAN PENGHILANG BANNER
  fixGoogleLayout();
});

// ==========================================
// GOOGLE TRANSLATE LOGIC
// ==========================================

function setLanguage(lang) {
  // Hapus cookie lama
  document.cookie =
    "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" +
    document.domain +
    "; path=/;";

  // Set cookie baru
  const cookieValue = "/id/" + lang;
  document.cookie = "googtrans=" + cookieValue + "; path=/";
  document.cookie =
    "googtrans=" + cookieValue + "; domain=" + document.domain + "; path=/";

  window.location.reload();
}

function updateLanguageUI(cookieLang) {
  const btnID = document.getElementById("lang-id");
  const btnEN = document.getElementById("lang-en");

  if (btnID && btnEN) {
    if (cookieLang && cookieLang.includes("/en")) {
      btnEN.classList.add("active");
      btnID.classList.remove("active");
    } else {
      btnID.classList.add("active");
      btnEN.classList.remove("active");
    }
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// --- AGRESIF FIX LAYOUT ---
function fixGoogleLayout() {
  // Observer untuk memaksa style body tetap normal
  const observer = new MutationObserver(() => {
    // 1. Paksa Body ke atas (menimpa style Google)
    if (document.body.style.top !== "0px") {
      document.body.style.setProperty("top", "0px", "important");
      document.body.style.setProperty("position", "static", "important");
    }

    // 2. Sembunyikan Frame Banner (TAPI JANGAN DI-REMOVE, CUMA HIDE)
    const banner = document.querySelector(".goog-te-banner-frame");
    if (banner) {
      banner.style.display = "none";
      banner.style.visibility = "hidden";
      banner.style.height = "0px";
    }

    // 3. Cek HTML element juga
    if (document.documentElement.style.height === "100%") {
      document.documentElement.style.removeProperty("height");
    }
    if (document.documentElement.style.marginTop) {
      document.documentElement.style.setProperty(
        "margin-top",
        "0px",
        "important",
      );
    }
  });

  // Pantau perubahan atribut style pada body dan html
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["style"],
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["style"],
  });
}

// ==========================================
// UTILS
// ==========================================

function toggleMenu() {
  const nav = document.querySelector(".nav-links");
  nav.classList.toggle("active");
}

function filterProjects(category) {
  const cards = document.querySelectorAll(".project-card-modern");
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.innerText.toLowerCase().includes(category) || category === "all") {
      if (btn.getAttribute("onclick").includes(category))
        btn.classList.add("active");
    }
  });

  cards.forEach((card) => {
    const categories = card.getAttribute("data-category");
    if (category === "all" || categories.includes(category)) {
      card.style.display = "block";
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "scale(1)";
      }, 50);
    } else {
      card.style.opacity = "0";
      card.style.transform = "scale(0.9)";
      setTimeout(() => {
        card.style.display = "none";
      }, 300);
    }
  });
}
