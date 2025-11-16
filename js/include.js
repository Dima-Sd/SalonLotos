document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  const isThankYouPage = path.includes('dziekujemy');
  const isMasazePage = path.includes('/masaze/');

  // === ВИЗНАЧЕННЯ ГЛИБИНИ ВІДНОСНО /SalonLotos/ ===
  const rootFolder = "/SalonLotos/"; 
  const relativePath = path.replace(rootFolder, ""); // видаляємо /SalonLotos/

  const depth = relativePath.split("/").length - 1;

  let prefix = "";
  for (let i = 0; i < depth; i++) {
    prefix += "../";
  }

  if (!isThankYouPage || isMasazePage) {

    // --- HEADER ---
    fetch(prefix + "header.html")
      .then(res => res.text())
      .then(data => {
        document.body.insertAdjacentHTML("afterbegin", data);

        // Фіксим логотип
        const logo = document.querySelector(".logo img");
        if (logo) {
          logo.src = prefix + "img/logo2.svg";
        }
      });

    // --- FOOTER ---
    fetch(prefix + "footer.html")
      .then(res => res.text())
      .then(data => {
        document.body.insertAdjacentHTML("beforeend", data);
      });
  }
});
