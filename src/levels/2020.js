export const LEVEL_2020 = {
  title: 'ECMAScript 2020, the 11th edition',
  description: `En 2020, JavaScript a introduit plusieurs nouvelles fonctionnalités qui améliorent la syntaxe, les performances, et la convivialité du langage.`,
  specialTiles: [
    {
      type: 'trap',
      title: 'La chèvre',
      description: ['La chèvre est un animal très agile qui peut sauter par-dessus les obstacles.'],
      goals: [
        "Sauter par-dessus les obstacles cachant d'autres obstacles : Utilisez la méthode flatMap pour aplatir un tableau de tableaux.",
        "Gestion des erreurs : Traitez les erreurs de manière appropriée pour éviter d'avoir une chèvre sur le dos.",
      ],
      codes: [`// Utilisation de flatMap pour aplatir les obstacles imbriquées
const fences = [
  [{ isFence: true }, { isFence: false }],
  [{ isFence: false }, { isFence: true }],
].flatMap((fence) => fence);`
      ],
      assets: ['/assets/trap/goat_fence_2020.mp4']
    },
    {
      type: 'bonus',
      title: 'matchAll',
      description: [
        "Cette méthode permet d'obtenir toutes les correspondances d'une expression régulière dans une chaîne, tout en fournissant des détails complets sur chaque correspondance, comme les groupes capturés."
      ],
      goals: [
        "Récupération complète des données : Contrairement à 'match', qui ne retourne que les correspondances principales, 'matchAll' inclut aussi les groupes capturés, ce qui est idéal pour des analyses complexes.",
        "Les résultats sont retournés sous forme d'un itérable, permettant une manipulation plus flexible avec des boucles ou des transformations",
      ],
      codes: [
        `const regex = /t(e)(st(\d?))/g;
const str = "test1test2test3";
const matches = str.matchAll(regex);

for (const match of matches) {
  console.log(match);
}`, `/**
 * Extraire les dates valides avec le format "dd/mm/yyyy" ou "dd-mm-yyyy"
 */
const texte = "Voici quelques dates à extraire : 15/03/2023, 12-04-2024, 07/11/2022, 13-13-2025, 03/07/2021, date invalide : 32/13/2020.";

const regex = /(\d{2})[\/\-](\d{2})[\/\-](\d{4})/g;

// Utilisation de matchAll pour trouver toutes les correspondances de dates
const matches = [...texte.matchAll(regex)];

matches.forEach(match => {
    const jour = match[1];  // Le jour (premier groupe capturé)
    const mois = match[2];  // Le mois (deuxième groupe capturé)
    const annee = match[3]; // L'année (troisième groupe capturé)

    // Validation de la date (en supposant que le mois soit entre 01 et 12 et le jour valide pour le mois donné)
    const dateObject = new Date(annee + '-' + mois + '-' + jour);

    if (dateObject.getDate() == jour && dateObject.getMonth() + 1 == mois && dateObject.getFullYear() == annee) {
        console.log("✅ Date valide trouvée :", match[0]);
    } else {
        console.log("❌ Date invalide trouvée :", match[0]);
    }

    console.log("Jour :", jour);
    console.log("Mois :", mois);
    console.log("Année :", annee);
    console.log("---");
});`
      ]
    },
    {
      type: 'treasure',
      title: 'import dynamique à la demande',
      description: [
        "La syntaxe `import()` permet de charger des modules dynamiquement et de manière asynchrone. Cela est utile pour le code splitting ou le chargement conditionnel des modules."
      ],
      goals: [
        "Code Splitting : Permet de charger uniquement les parties nécessaires d'une application, réduisant ainsi la taille initiale du bundle.",
        "Chargement conditionnel : Les modules peuvent être importés en fonction des besoins ou des actions de l'utilisateur.",
        "Amélioration des performances : Réduit le JavaScript exécuté au démarrage, accélérant le temps de chargement initial.",
        "Interopérabilité : Facilite l'intégration de bibliothèques ou modules tiers uniquement au moment requis.",
      ],
      codes: [
        `import("./module.js")
  .then((module) => {
    module.doSomething();
  })
  .catch((error) => {
    console.error("Error loading module:", error);
  });`, `
// Fichier index.html
<button id="loadTitleModuleButton">Charger le module</button>
<h1 id="titleHello"></h1>

// Fichier main.js
document
  .getElementById("loadTitleModuleButton")
  .addEventListener("click", async () => {
    // En Production : Utilisez un hash dans le nom du fichier ou configurez les en-têtes HTTP
    const modulePath = "./helloModule.js?cacheBust=" + Date.now();
    await import(modulePath)
      .then((module) => {
        // Utiliser le module importé
        module.sayHello();
      })
      .catch((err) => {
        console.error("Erreur lors du chargement dynamique :", err);
      });
  });

// Fichier helloModule.js
// Hello Module
export function sayHello() {
  const message = 'Hello TNT !';
  console.log(message);
  document.getElementById('titleHello').innerText = message;
}`
      ]
    },
    {
      type: 'bonus',
      title: 'BigInt',
      description: [
        "`BigInt` est un nouveau type primitif qui permet de manipuler des nombres entiers très grands, au-delà de la limite des nombres classiques en JavaScript (2^53 - 1)."
      ],
      goals: [
        "Précision accrue : Utile pour les applications nécessitant des calculs exacts avec de grands entiers (cryptographie, finance, etc.).",
        "Interopérabilité avec d'autres systèmes : Certains systèmes externes nécessitent des entiers au-delà des capacités de `Number`.",
      ],
      codes: [
        `const bigInt = 1234567890123456789012345678901234567890n;
const anotherBigInt = BigInt("1234567890123456789012345678901234567890");

console.log(bigInt + 2n); // 1234567890123456789012345678901234567892n`
      ]
    },
    {
      type: 'bonus',
      title: 'Promise.allSettled',
      description: [
        "Cette méthode permet de traiter un tableau de promesses et renvoie les résultats de toutes, qu'elles soient résolues ou rejetées. Contrairement à `Promise.all`, elle n'arrête pas son exécution si une promesse est rejetée."
      ],
      goals: [
        "Tolérance aux erreurs : Permet de gérer les résultats même en cas de rejet de certaines promesses.",
        "Analyse complète : Fournit un résumé des promesses, qu'elles soient résolues ou rejetées, sans court-circuiter.",
      ],
      codes: [
        `const promises = [
  Promise.resolve(42),
  Promise.reject("Error"),
  Promise.resolve("Success"),
];

Promise.allSettled(promises).then((results) => {
  results.forEach((result) => console.log(result));
});`
      ]
    },
    {
      type: 'treasure',
      title: 'globalThis',
      description: [
        "`globalThis` fournit un moyen standard d'accéder à l'objet global, quel que soit l'environnement d'exécution (navigateur, Node.js, etc.)."
      ],
      goals: [
        "Standardisation : Évite les variations comme `window`, `global`, ou `self`, selon l'environnement.",
        "Interopérabilité : Simplifie le code qui doit fonctionner dans des contextes multiples.",
      ],
      codes: [
        `console.log(globalThis); // Fonctionne dans tous les environnements`
      ]
    },
    {
      type: 'treasure',
      title: 'export * as ns from "module"',
      description: [
        "Cette syntaxe facilite l'exportation de tous les éléments d'un module sous un namespace donné."
      ],
      goals: [
        "Lisibilité : Regroupe tous les exports sous un même namespace.",
        "Organisation : Simplifie la gestion des modules avec de nombreux exports.",
      ],
      codes: [
        `// module.js
export const a = 1;
export const b = 2;

// main.js
export * as myModule from "./module.js";

// Utilisation
import { myModule } from "./main.js";
console.log(myModule.a, myModule.b); // 1, 2`
      ]
    },
    {
      type: 'bonus',
      title: 'Ordre d\'énumération dans `for-in`',
      description: [
        "L'ordre d'itération des clés dans une boucle `for-in` a été davantage standardisé pour respecter l'ordre d'insertion."
      ],
      goals: [
        "Fiabilité : Garantit un comportement prévisible entre différents moteurs JavaScript.",
        "Compatibilité : Facilite le développement d'applications basées sur des itérations ordonnées.",
      ],
      codes: [
        `const obj = { b: 1, a: 2, c: 3 };
for (const key in obj) {
  console.log(key); // Garantit l'ordre d'insertion : 'b', 'a', 'c'
}`
      ]
    },
    {
      type: 'bonus',
      title: 'import.meta',
      description: [
        "`import.meta` est un objet propre à chaque module. Il contient des informations contextuelles sur le module, comme son URL."
      ],
      goals: [
        "Métadonnées modulaires : Fournit un accès aux informations spécifiques au module (par exemple, URL ou contexte d'exécution).",
        "Interopérabilité : Simplifie l'interaction avec les systèmes de modules.",
      ],
      codes: [
        `console.log(import.meta); // Fournit des informations comme l'URL du module`
      ]
    },
    {
      type: 'bonus',
      title: 'Nullish Coalescing (`??`)',
      description: [
        "L'opérateur `??` permet de retourner la première valeur qui n'est ni `null` ni `undefined`, offrant une alternative plus précise à `||` pour les valeurs nullish."
      ],
      goals: [
        "Précision : Évite les comportements inattendus avec des valeurs falsy comme `0` ou `\"\"`.",
        "Lisibilité : Rend le code plus clair pour les développeurs.",
      ],
      codes: [
        `let value = null ?? "default";
console.log('null ?? retourne', value); // retourne 'default';

value = null || "default";
console.log('null || retourne', value); // retourne 'default';

value = 0 ?? "default";
console.log('0 ?? retourne', value); // retourne 0;

value = 0 || "default";
console.log('0 || retourne', value); // retourne 'default';`
      ]
    },
    {
      type: 'treasure',
      title: 'Optional Chaining (`?.`)',
      description: [
        "Cet opérateur simplifie l'accès aux propriétés profondes d'un objet sans avoir à vérifier chaque niveau de l'objet. Il court-circuite si une valeur est `null` ou `undefined`."
      ],
      goals: [
        "Simplicité : Réduit la nécessité d'écrire du code répétitif pour vérifier chaque niveau.",
        "Sécurité : Prévient les erreurs liées aux accès non définis.",
      ],
      codes: [
        `const obj = { a: { b: null } };
console.log(obj?.a?.b?.c); // undefined (sans erreur)
console.log(obj.a.b.c); // avec erreur`
      ]
    }
  ]
}
