/**
 * Extraire les dates valides avec le format "dd/mm/yyyy" ou "dd-mm-yyyy"
 */
const texte = `
    Voici quelques dates à extraire :
    15/03/2023,
    12-04-2024,
    07/11/2022,
    13-13-2025,
    03/07/2021,
    date invalide : 32/13/2020.
`;

const regex = /(\d{2})[\/\-](\d{2})[\/\-](\d{4})/g;

// Utilisation de matchAll pour trouver toutes les correspondances de dates
const matches = [...texte.matchAll(regex)];

matches.forEach(match => {
    const jour = match[1];  // Le jour (premier groupe capturé)
    const mois = match[2];  // Le mois (deuxième groupe capturé)
    const annee = match[3]; // L'année (troisième groupe capturé)

    // Validation de la date (en supposant que le mois soit entre 01 et 12 et le jour valide pour le mois donné)
    const dateObject = new Date(`${annee}-${mois}-${jour}`);

    if (dateObject.getDate() == jour && dateObject.getMonth() + 1 == mois && dateObject.getFullYear() == annee) {
        console.log(`✅ Date valide trouvée: ${match[0]}`);
    } else {
        console.log(`❌ Date invalide trouvée: ${match[0]}`);
    }

    console.log(`Jour: ${jour}`);
    console.log(`Mois: ${mois}`);
    console.log(`Année: ${annee}`);
    console.log('---');
});
