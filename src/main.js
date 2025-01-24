const loadGameButton = document
  .getElementById("loadGameButton");

loadGameButton.addEventListener("click", async () => {
  // En Production : Utilisez un hash dans le nom du fichier ou configurez les en-têtes HTTP
  const modulePath = `./game.js`;
  await import(modulePath)
    .then((gameModule) => {
      // Utiliser le module importé
      loadGameButton.classList.add("hidden");
      gameModule.start();
    })
    .catch((err) => {
      console.error("Erreur lors du chargement dynamique :", err);
    });
});