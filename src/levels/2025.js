export const LEVEL_2025 = {
  id: 'ecmascript-2025',
  shortTitle: 'Stage 4 (2025)',
  title: "ECMAScript 2025, the 16th edition - Stage 4",
  specialTiles: [
    {
      id: "promise-try",
      type: "bonus",
      title: "Promise.try",
      description: "Une méthode pratique pour gérer les erreurs dans les fonctions synchrones et asynchrones, en encapsulant automatiquement les exceptions dans une promesse rejetée.",
      goals: [
        "Gestion simplifiée des erreurs : Unifie le traitement des erreurs pour le code synchrone et asynchrone.",
        "Lisibilité accrue : Réduit le besoin de blocs try-catch explicites."
      ],
      codes: [
        `function doSomething(action) {
  return Promise.try(action)
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
    .finally(() => console.log("Done"));
}

doSomething(() => "Sync result");

doSomething(() => {
  throw new Error("Sync error");
});

doSomething(async () => "Async result");

doSomething(async () => {
  throw new Error("Async error");
});`
      ]
    },
    {
      id: "synchronous-iterator-helpers",
      type: "bonus",
      title: "Aides pour les itérateurs synchrones",
      description: "Des méthodes utilitaires pour faciliter le traitement des itérateurs synchrones, similaires à celles disponibles pour les itérateurs asynchrones.",
      goals: [
        "Uniformité : Aligne les fonctionnalités des itérateurs synchrones et asynchrones.",
        "Simplification : Réduit le code nécessaire pour manipuler les itérateurs."
      ],
      codes: [
        `const iterator = [1, 2, 3].values();
const result = iterator.map((x) => x * 2).toArray();
console.log(result); // [2, 4, 6]`
      ]
    },
    {
      check: true,
      id: "json-modules",
      type: "treasure",
      title: "Modules JSON",
      description: "JavaScript permettra d'importer directement des fichiers JSON comme modules.",
      goals: [
        "Interopérabilité : Facilite l'utilisation de fichiers de configuration ou de données.",
        "Simplification : Évite les lectures manuelles de fichiers JSON."
      ],
      codes: [
        `import json from "./foo.json" with { type: "json" };
import("foo.json", { with: { type: "json" } });`
      ],
      sources: [
        "https://github.com/tc39/proposal-json-modules"
      ]
    },
    {
      check: true,
      id: "import-attributes",
      type: "treasure",
      title: "Attributs d'importation",
      description: "Les attributs d'importation permettent de fournir des métadonnées supplémentaires pour les modules importés.",
      goals: [
        "Flexibilité : Permet un contrôle plus précis lors de l'importation.",
        "Compatibilité étendue : Soutient des cas d'utilisation spécifiques, comme l'importation conditionnelle."
      ],
      codes: [
        `import data from "./data.json" with { type: "json" };
console.log(data);`,
`export { val } from './foo.js' with { type: "javascript" };`,
`import("foo.json", { with: { type: "json" } })`,
`new Worker("foo.wasm", { type: "module", with: { type: "webassembly" } });`,
`<script src="foo.wasm" type="module" withtype="webassembly"></script>`
      ],
      sources: [
        'https://github.com/tc39/proposal-import-attributes?tab=readme-ov-file'
      ]
    },
    {
      id: "regexp-modifiers",
      type: "bonus",
      title: "Modificateurs RegExp",
      description: "Une fonctionnalité permettant d'appliquer des modificateurs à des expressions régulières existantes.",
      goals: [
        "Réutilisation : Facilite la création d'expressions régulières dérivées.",
        "Écriture concise : Évite la duplication de code."
      ],
      codes: [
        `const baseRegex = /abc/;
const modifiedRegex = baseRegex.withFlags("gi");
console.log(modifiedRegex.test("ABC")); // true`
      ]
    },
    {
      id: "set-methods",
      type: "bonus",
      title: "Nouvelles méthodes pour les ensembles",
      description: "Des méthodes supplémentaires pour les objets Set, élargissant leur utilité.",
      goals: [
        "Manipulation étendue : Simplifie les opérations courantes sur les ensembles.",
        "Expressivité accrue : Réduit le besoin de solutions ad hoc."
      ],
      codes: [
        `const set1 = new Set([1, 2, 3]);
const set2 = new Set([3, 4, 5]);
const union = set1.union(set2);
console.log([...union]); // [1, 2, 3, 4, 5]`
      ]
    },
    {
      id: "regexp-named-capture-groups",
      type: "bonus",
      title: "Groupes de capture nommés en double dans les RegExp",
      description: "Les expressions régulières pourront inclure des groupes de capture nommés en double.",
      goals: [
        "Souplesse : Autorise des correspondances plus complexes avec des groupes réutilisables.",
        "Interopérabilité : Aligne JavaScript sur d'autres langages qui prennent déjà en charge cette fonctionnalité."
      ],
      codes: [
        `const regex = /(?<num>\\d+)-(?<num>\\d+)/;
const match = regex.exec("123-456");
console.log(match.groups.num); // "456"`
      ]
    },
    {
      id: "intl-durationformat",
      type: "treasure",
      title: "Intl.DurationFormat (Ecma 402)",
      description: "Une nouvelle API pour formater des durées dans un format lisible et adapté à la locale.",
      goals: [
        "Fournir un moyen standardisé d'afficher des durées de manière naturelle.",
        "Prendre en charge différentes granularités (heures, minutes, secondes, etc.).",
        "Gérer automatiquement les règles linguistiques spécifiques à chaque locale."
      ],
      codes: [
        `const formatter = new Intl.DurationFormat("fr", { style: "long" });
    
    console.log(formatter.format({ hours: 1, minutes: 30 })); 
    // "1 heure et 30 minutes"`

      ]
    }
  ]
};
