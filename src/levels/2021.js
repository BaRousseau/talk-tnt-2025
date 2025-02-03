export const LEVEL_2021 = {
  title: "ECMAScript 2021 - 12th Edition",
  description: "En 2021, JavaScript a continué d'évoluer avec l'ajout de fonctionnalités qui améliorent la convivialité, la précision, et les performances du langage.",
  specialTiles: [
    {
      id: "replaceAll",
      type: "treasure",
      title: "replaceAll",
      description: "Remplace toutes les occurrences d'une sous-chaîne dans une chaîne donnée.",
      goals: [
        "Simplifier le remplacement global.",
        "Améliorer la lisibilité du code.",
      ],
      codes: [
        `const str = "abc abc abc";
console.log(str.replaceAll("abc", "123")); // "123 123 123"`
      ]
    },
    {
      id: "promise-any",
      type: "bonus",
      title: "Promise.any",
      description: "Renvoie la première promesse résolue parmi un ensemble de promesses.",
      goals: [
        "Récupérer le premier succès parmi plusieurs opérations asynchrones.",
        "Tolérer les échecs de certaines promesses.",
      ],
      codes: [
        `const promises = [
  Promise.reject("Error"),
  Promise.resolve("Success"),
  Promise.resolve("Another success"),
];

Promise.any(promises)
  .then((result) => {
    console.log(result); // "Success"
  })
  .catch((error) => {
    console.error(error);
  });`
      ]
    },
    {
      id: "aggregate-error",
      type: "treasure",
      title: "AggregateError",
      description: "Un type d'erreur représentant plusieurs erreurs en même temps.",
      goals: [
        "Regrouper plusieurs erreurs.",
        "Faciliter la gestion des erreurs complexes.",
      ],
      codes: [
        `try {
  throw new AggregateError([
    new Error("First error"),
    new Error("Second error"),
  ], "Multiple errors occurred");
} catch (error) {
  console.log(error.message); // "Multiple errors occurred"
  console.log(error.errors); // [Error: First error, Error: Second error]
}`
      ]
    },
    {
      id: "logical-assignment-operators",
      type: "bonus",
      title: "Opérateurs d'affectation logique",
      description: "Des opérateurs combinant affectations et opérations logiques.",
      goals: [
        "Réduire les expressions conditionnelles.",
        "Rendre le code plus lisible.",
      ],
      codes: [
        `let a = null;
a ??= 42;
console.log(a); // 42

let b = true;
b &&= false;
console.log(b); // false

let c = false;
c ||= true;
console.log(c); // true`
      ]
    },
    {
      id: "weakref-finalizationregistry",
      type: "treasure",
      title: "WeakRef et FinalizationRegistry",
      description: "Des outils pour la gestion avancée de la mémoire.",
      goals: [
        "Faciliter la gestion mémoire.",
        "Améliorer l'interopérabilité des caches et wrappers.",
      ],
      codes: [
        `let target = { key: "value" };
const weakRef = new WeakRef(target);

console.log(weakRef.deref()); // { key: "value" }

target = null; // L'objet peut être collecté

const registry = new FinalizationRegistry((heldValue) => {
  console.log(\`Object with value \${heldValue} was garbage collected.\`);
});

registry.register(weakRef, "someValue");`
      ]
    },
    {
      id: "numeric-separators",
      type: "bonus",
      title: "Séparateurs pour les littéraux numériques",
      description: "Utilisation de `_` pour améliorer la lisibilité des nombres.",
      goals: [
        "Faciliter la lecture des grands nombres.",
        "Améliorer la compréhension des valeurs numériques.",
      ],
      codes: [
        `const largeNumber = 1_000_000;
console.log(largeNumber); // 1000000

const hexNumber = 0xff_ff_ff;
console.log(hexNumber); // 16777215`
      ]
    },
    {
      id: "array-sort-stability",
      type: "treasure",
      title: "Précision de Array.prototype.sort",
      description: "Amélioration pour garantir un tri plus stable et cohérent.",
      goals: [
        "Garantir un comportement prévisible du tri.",
        "Faciliter l'écriture de tests fiables.",
      ],
      codes: [
        `const arr = ["c", "b", "a"];
arr.sort();
console.log(arr); // ["a", "b", "c"]`
      ]
    }
  ]
};
