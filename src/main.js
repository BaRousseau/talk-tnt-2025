const modulePath = `./game.js?${Date.now()}`; // Force le rechargement du module
import(modulePath)
  .then((gameModule) => {
    gameModule.start();
  })
  .catch((err) => {
    console.error("Erreur lors du chargement dynamique :", err);
  });
