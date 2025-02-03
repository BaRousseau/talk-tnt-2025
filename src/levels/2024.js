export const LEVEL_2024 = {
  title: "ECMAScript 2024, the 15th edition",
  description: "En 2024, JavaScript a continué d'évoluer avec des ajouts significatifs qui renforcent sa flexibilité et ses capacités de traitement des données.",
  specialTiles: [
    {
      id: "arraybuffer-resizing",
      type: "bonus",
      title: "Redimensionnement et transfert des ArrayBuffers",
      description: "JavaScript permet désormais de redimensionner et de transférer les ArrayBuffer et SharedArrayBuffer.",
      goals: [
        "Optimisation de la mémoire : Ajuste dynamiquement les tailles des tampons pour mieux utiliser les ressources.",
        "Interopérabilité : Facilite les opérations dans des environnements de calcul intensif ou de manipulation binaire."
      ],
      codes: [
        `const buffer = new ArrayBuffer(10);
const resizedBuffer = buffer.resize(20);
console.log(resizedBuffer.byteLength); // 20`
      ]
    },
    {
      id: "regex-v-flag",
      type: "bonus",
      title: "Drapeau /v pour les expressions régulières",
      description: "Le drapeau /v introduit des fonctionnalités avancées pour travailler avec des ensembles de chaînes dans les expressions régulières.",
      goals: [
        "Puissance accrue : Simplifie la gestion de cas complexes dans les correspondances.",
        "Précision : Offre des outils plus avancés pour manipuler les ensembles de chaînes."
      ],
      codes: [
        `const regex = /[a-z]/v;
console.log(regex.test("abc")); // true`
      ]
    },
    {
      id: "promise-with-resolvers",
      type: "bonus",
      title: "Méthode Promise.withResolvers",
      description: "Cette méthode pratique facilite la création de promesses en exposant directement leurs résolveurs.",
      goals: [
        "Lisibilité : Réduit la complexité lors de la manipulation de promesses.",
        "Conception simplifiée : Améliore la gestion asynchrone."
      ],
      codes: [
        `const { promise, resolve, reject } = Promise.withResolvers();
resolve("Success");
promise.then(console.log); // "Success"`
      ]
    },
    {
      id: "object-groupby",
      type: "bonus",
      title: "Object.groupBy et Map.groupBy",
      description: "Ces méthodes permettent de regrouper des données en fonction d'une clé ou d'une fonction de regroupement.",
      goals: [
        "Agrégation de données simplifiée : Réduit le besoin de boucles complexes.",
        "Lisibilité : Rassemble les opérations de regroupement en une seule méthode."
      ],
      codes: [
        `const data = ["apple", "banana", "cherry", "avocado"];
const grouped = Object.groupBy(data, (word) => word[0]);
console.log(grouped); // { a: ["apple", "avocado"], b: ["banana"], c: ["cherry"] }`
      ]
    },
    {
      id: "atomics-wait-async",
      type: "bonus",
      title: "Atomics.waitAsync",
      description: "Cette méthode permet d'attendre de manière asynchrone les modifications apportées à la mémoire partagée.",
      goals: [
        "Traitement asynchrone : Offre des mécanismes plus fluides pour travailler avec des données partagées.",
        "Interopérabilité avec les threads : Améliore la coordination entre les threads."
      ],
      codes: [
        `const sharedArray = new Int32Array(new SharedArrayBuffer(4));
Atomics.store(sharedArray, 0, 0);

Atomics.waitAsync(sharedArray, 0, 0).value.then(() => {
  console.log("Memory updated!");
});
Atomics.store(sharedArray, 0, 1);`
      ]
    },
    {
      id: "string-is-well-formed",
      type: "bonus",
      title: "Méthodes isWellFormed et toWellFormed pour les chaînes",
      description: "JavaScript introduit des outils pour vérifier et garantir que les chaînes contiennent uniquement des caractères Unicode bien formés.",
      goals: [
        "Compatibilité Unicode : Améliore la gestion des chaînes dans des contextes multilingues.",
        "Fiabilité : Réduit les erreurs liées à des données mal formées."
      ],
      codes: [
        `const malformed = "\\uD800"; // Demi-symbole non apparié
console.log(malformed.isWellFormed()); // false
console.log(malformed.toWellFormed()); // "\\uFFFD" (remplace par un caractère de substitution)`
      ]
    }
  ]
};
