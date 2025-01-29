const loadGameButton = document.getElementById("loadGameButton");

loadGameButton.addEventListener("click", async () => {
  const modulePath = `./game.js?${Date.now()}`; // Force le rechargement du module
  await import(modulePath)
    .then((gameModule) => {
      loadGameButton.innerText = "Recharger une partie";

      const tileSize = 2; // Taille des tuiles (en rem)
      const specialTileConfig = {
        treasure: 5,
        trap: 3,
        bonus: 6,
      };
      gameModule.start(tileSize, specialTileConfig);
    })
    .catch((err) => {
      console.error("Erreur lors du chargement dynamique :", err);
    });
});
