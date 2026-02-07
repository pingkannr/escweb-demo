document.addEventListener("DOMContentLoaded", () => {
  // 1. SCROLL REVEAL ANIMATION (Bawaan Lama)
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

  // 2. BACK TO TOP BUTTON (Bawaan Lama)
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

  // 3. NAVBAR SCROLL EFFECT (Bawaan Lama)
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  });

  // 4. CHECK LANGUAGE STATUS (REVISI PERBAIKAN)
  // Kita jalankan pengecekan cookie saat halaman selesai dimuat
  updateLanguageUI();

  // 5. JALANKAN PENGHILANG BANNER (Bawaan Lama - Sangat Bagus)
  fixGoogleLayout();
});

// ==========================================
// GOOGLE TRANSLATE LOGIC (REVISI)
// ==========================================

// Fungsi Helper Membaca Cookie yang Lebih Kuat
function readCookie(name) {
  var c = document.cookie.split("; "),
    param = name + "=",
    i = 0,
    len = c.length,
    C;
  while (i < len) {
    C = c[i];
    while (C.charAt(0) == " ") C = C.substring(1);
    if (C.indexOf(param) == 0) return C.substring(param.length, C.length);
    i++;
  }
  return "";
}

function setLanguage(lang) {
  // Hapus cookie lama untuk reset
  document.cookie =
    "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" +
    document.domain +
    "; path=/;";

  // Set cookie baru (/id/en atau /id/id)
  const cookieValue = "/id/" + lang;
  document.cookie = "googtrans=" + cookieValue + "; path=/";
  document.cookie =
    "googtrans=" + cookieValue + "; domain=" + document.domain + "; path=/";

  // Reload halaman agar Google Translate bereaksi
  window.location.reload();
}

function updateLanguageUI() {
  const cookieValue = readCookie("googtrans"); // Pakai fungsi readCookie yang baru
  const btnID = document.getElementById("lang-id");
  const btnEN = document.getElementById("lang-en");

  if (btnID && btnEN) {
    // Reset dulu
    btnID.classList.remove("active");
    btnEN.classList.remove("active");

    // Cek isi cookie
    if (cookieValue.indexOf("/en") > -1) {
      // Jika ada '/en', berarti sedang bahasa Inggris
      btnEN.classList.add("active");
    } else {
      // Default (kosong atau /id/id) adalah Indonesia
      btnID.classList.add("active");
    }
  }
}

// ==========================================
// LAYOUT FIXER (Bawaan Lama - Agresif)
// ==========================================
function fixGoogleLayout() {
  // Observer untuk memaksa style body tetap normal
  const observer = new MutationObserver(() => {
    // 1. Paksa Body ke atas (menimpa style Google)
    if (document.body.style.top !== "0px") {
      document.body.style.setProperty("top", "0px", "important");
      document.body.style.setProperty("position", "static", "important");
    }

    // 2. Sembunyikan Frame Banner
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
// UTILS (NAV & PROJECT FILTER - Bawaan Lama)
// ==========================================

function toggleMenu() {
  const nav = document.querySelector(".nav-links");
  nav.classList.toggle("active");
}

// Fungsi Filter Projects (PENTING UNTUK HALAMAN PORTFOLIO)
// Saya perbaiki sedikit agar tidak error jika dijalankan di halaman selain portfolio
function filterProjects(category) {
  const cards = document.querySelectorAll(".project-card-modern");
  const buttons = document.querySelectorAll(".filter-btn");

  if (cards.length === 0) return; // Guard clause jika bukan halaman portfolio

  buttons.forEach((btn) => {
    btn.classList.remove("active");
    // Cek teks tombol atau onclick event untuk set active state
    if (
      btn.textContent.toLowerCase().includes(category) ||
      category === "all"
    ) {
      btn.classList.add("active");
    }
    // Fallback: cek atribut onclick jika teks tidak cocok (untuk multilingual)
    if (
      btn.getAttribute("onclick") &&
      btn.getAttribute("onclick").includes(category)
    ) {
      btn.classList.add("active");
    }
  });

  cards.forEach((card) => {
    // Asumsi: data-category ada di element card.
    // Jika filter berdasarkan ID section (seperti di HTML baru), logika ini tidak terpakai,
    // tapi tetap saya simpan untuk kompatibilitas kode lama.
    const categories = card.getAttribute("data-category");
    if (categories) {
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
    }
  });
}
