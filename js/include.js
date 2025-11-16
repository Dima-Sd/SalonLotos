document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  const isThankYouPage = path.includes('dziekujemy');
  const isMasazePage = path.includes('/masaze/');

  // === АВТОМАТИЧНЕ ВИЗНАЧЕННЯ ГЛИБИНИ ===
  // підрахунок, скільки папок у URL перед файлом
  const depth = window.location.pathname
    .replace(/\/$/, "") // прибрати trailing slash
    .split("/").length - 2; // мінус домен і мінус файл

  // формування префікса ../ або ../../ або "" (для кореня)
  let prefix = "";
  for (let i = 0; i < depth; i++) {
    prefix += "../";
  }

  if (!isThankYouPage || isMasazePage) {

    // --- HEADER ---
    fetch(prefix + "header.html")
      .then(response => response.text())
      .then(data => {
        document.body.insertAdjacentHTML("afterbegin", data);

        // === ФІКС ЛОГОТИПУ ===
        const logo = document.querySelector(".logo img");
        if (logo) {
          logo.src = prefix + "img/logo2.svg";
        }

        // === SCROLLED HEADER ===
        const content = document.querySelector('.header');
        if (content) {
          window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;
            content.classList.toggle('scrolled', scrollPosition >= 100);
          });
        }

        // === MOBILE MENU ===
        const mobileButton = document.querySelector('.mobile-button');
        const menu = document.querySelector('.menu');
        const body = document.querySelector('body');

        if (mobileButton && menu && body) {
          mobileButton.addEventListener("click", function () {
            const isHidden = menu.classList.contains('is-hidden');
            this.classList.toggle('is-open', isHidden);
            menu.classList.toggle('is-hidden', !isHidden);
            body.classList.toggle('no-scroll', isHidden);
          });
        }
      });

    // --- FOOTER ---
    fetch(prefix + "footer.html")
      .then(response => response.text())
      .then(data => {
        document.body.insertAdjacentHTML("beforeend", data);
      });
  }
});
