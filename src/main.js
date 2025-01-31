const loadGameButton = document.getElementById("loadGameButton");

loadGameButton.addEventListener("click", async () => {
  const modulePath = `./game.js?${Date.now()}`; // Force le rechargement du module
  await import(modulePath)
    .then((gameModule) => {
      loadGameButton.classList.add('hidden');
      gameModule.start();
    })
    .catch((err) => {
      console.error("Erreur lors du chargement dynamique :", err);
    });
});
