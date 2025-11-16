// --- RESET ---
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = './css/reset.css';
document.head.appendChild(link);

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  const isThankYouPage = path.includes('dziekujemy');
  const isMasazePage = path.includes('/masaze/');

  if (!isThankYouPage || isMasazePage) {

    // --- HEADER ---
    fetch("./header.html")
      .then(response => response.text())
      .then(data => {
        document.body.insertAdjacentHTML("afterbegin", data);

        const content = document.querySelector('.header');
        if (content) {
          window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;
            content.classList.toggle('scrolled', scrollPosition >= 100);
          });
        }

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
    fetch("./footer.html")
      .then(response => response.text())
      .then(data => {
        document.body.insertAdjacentHTML("beforeend", data);
      });
  }
});
