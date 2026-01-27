document.addEventListener("DOMContentLoaded", () => {
  // 1. SCROLL REVEAL ANIMATION
  // Membuat elemen muncul perlahan saat di-scroll
  const reveals = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150; // Jarak trigger dari bawah

    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Trigger sekali saat load

  // 2. BACK TO TOP BUTTON
  const backBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backBtn.style.display = "flex";
    } else {
      backBtn.style.display = "none";
    }
  });

  backBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // 3. NAVBAR SCROLL EFFECT (Transisi Background)
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 4. SMOOTH SCROLL FOR ANCHOR LINKS
  // Agar saat klik menu, scrollnya halus dan pas posisinya
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80; // Tinggi header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

// Mobile Menu Toggle
function toggleMenu() {
  const nav = document.querySelector(".nav-links");
  nav.classList.toggle("active");
}

// --- PROJECT FILTER FUNCTION ---
function filterProjects(category) {
  const cards = document.querySelectorAll(".project-card-modern");
  const buttons = document.querySelectorAll(".filter-btn");

  // Update tombol aktif
  buttons.forEach((btn) => {
    btn.classList.remove("active");
    if (
      btn.innerText.toLowerCase().includes(category) ||
      (category === "all" && btn.innerText === "All Projects")
    ) {
      btn.classList.add("active");
    }
  });

  // Filter kartu
  cards.forEach((card) => {
    const categories = card.getAttribute("data-category"); // Bisa punya multiple category

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
