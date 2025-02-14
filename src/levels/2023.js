export const LEVEL_2023 = {
  id: 'ecmascript-2023',
  shortTitle: '2023',
  title: "ECMAScript 2023, the 14th edition",
  description: "En 2023, JavaScript a introduit des fonctionnalités majeures qui enrichissent encore davantage les capacités du langage.",
  specialTiles: [
    {
      id: "array-methods",
      type: "bonus",
      title: "Nouvelles méthodes sur Array et TypedArray",
      description: "Ajout de nouvelles méthodes pour manipuler les tableaux sans les modifier.",
      goals: [
        "Préserver les données d'origine.",
        "Permettre une manipulation flexible des tableaux."
      ],
      codes: [
        `const arr = [1, 2, 3, 4, 5];

console.log(arr.toSorted((a, b) => b - a)); // [5, 4, 3, 2, 1]
console.log(arr.toReversed()); // [5, 4, 3, 2, 1]
console.log(arr.findLast((x) => x % 2 === 0)); // 4
console.log(arr.findLastIndex((x) => x % 2 === 0)); // 3`
      ]
    },
    {
      id: "hashbang-comments",
      type: "bonus",
      title: "Support des commentaires #!",
      description: "Permet d'utiliser des commentaires #! au début des fichiers JavaScript pour les scripts exécutables.",
      goals: [
        "Permet de spécifier des interpréteurs ou des environnements d'exécution.",
        "Simplifie l'écriture de scripts exécutables."
      ],
      codes: [
        `#! /usr/bin/env node
console.log("Hello, world!");`
      ]
    },
    {
      id: "symbol-keys-in-weak-collections",
      type: "bonus",
      title: "Symboles comme clés dans les collections faibles",
      description: "Les symboles peuvent maintenant être utilisés comme clés dans WeakMap et WeakSet.",
      goals: [
        "Étendre les possibilités des WeakMap et WeakSet avec des clés symboliques.",
        "Améliorer l'interopérabilité avec les symboles."
      ],
      codes: [
        `const sym = Symbol("key");
const weakMap = new WeakMap();
const obj = {};

weakMap.set(obj, sym);
console.log(weakMap.get(obj)); // Symbol(key)`
      ]
    },
    {
      id: "intl-numberformat-v3",
      type: "treasure",
      title: "Intl.NumberFormat V3 (Ecma 402)",
      description: "Une extension de l'API `Intl.NumberFormat` offrant plus d'options de personnalisation pour le formatage des nombres.",
      goals: [
        "Ajouter la prise en charge des paramètres de mise en forme avancés, comme la notation scientifique et les arrondis personnalisés.",
        "Introduire la gestion des séparateurs de groupes et des symboles de devises améliorée.",
        "Offrir plus de contrôle sur l'affichage des nombres pour des cas d'utilisation spécialisés."
      ],
      codes: [
        `const formatter = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      roundingMode: "expand",
      notation: "scientific"
    });
    
    console.log(formatter.format(123456)); // "1,23456E5 €"`
      ]
    }    
  ]
};
