document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  const isThankYouPage = path.includes("dziekujemy");
  const isMasazePage = path.includes("/masaze/");

  // якщо це не сторінка подяки — підключаємо хедер/футер
  if (!isThankYouPage || isMasazePage) {

    // якщо ми в папці /masaze/ → треба "../"
    // якщо ми в корені → префікс порожній
    const prefix = isMasazePage ? "../" : "";

    // --- HEADER ---
    fetch(prefix + "header.html")
      .then((res) => res.text())
      .then((data) => {
        document.body.insertAdjacentHTML("afterbegin", data);

        // фіксим логотип
        const logo = document.querySelector(".logo img");
        if (logo) {
          logo.src = prefix + "img/logo2.svg";
        }

        const content = document.querySelector(".header");
        if (content) {
          window.addEventListener("scroll", () => {
            const scrollPosition =
              window.scrollY || document.documentElement.scrollTop;
            content.classList.toggle("scrolled", scrollPosition >= 100);
          });
        }

        const mobileButton = document.querySelector(".mobile-button");
        const menu = document.querySelector(".menu");
        const body = document.querySelector("body");

        if (mobileButton && menu && body) {
          mobileButton.addEventListener("click", function () {
            const isHidden = menu.classList.contains("is-hidden");
            this.classList.toggle("is-open", isHidden);
            menu.classList.toggle("is-hidden", !isHidden);
            body.classList.toggle("no-scroll", isHidden);
          });
        }
      });

    // --- FOOTER ---
    fetch(prefix + "footer.html")
      .then((res) => res.text())
      .then((data) => {
        document.body.insertAdjacentHTML("beforeend", data);
      });
  }
});
