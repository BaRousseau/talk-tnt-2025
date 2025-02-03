export const LEVEL_2022 = {
  title: "ECMAScript 2022, the 13th edition",
  description: "En 2022, JavaScript a introduit plusieurs améliorations significatives, renforçant la flexibilité et la puissance du langage pour répondre aux besoins des développeurs modernes.",
  specialTiles: [
    {
      id: "top-level-await",
      type: "bonus",
      title: "Top-Level await",
      description: "Permet d'utiliser await au niveau supérieur des modules.",
      goals: [
        "Éviter d'encapsuler le code dans une fonction asynchrone.",
        "Améliorer l'intégration avec des modules asynchrones."
      ],
      codes: [
        `// Importation d'un module asynchrone
const data = await fetch("https://geo.api.gouv.fr/regions?fields=nom,code").then((res) => res.json());
console.log(data);`
      ]
    },
    {
      id: "private-class-fields",
      type: "bonus",
      title: "Nouveaux éléments de classes",
      description: "Ajout de champs et méthodes privés et statiques dans les classes.",
      goals: [
        "Renforcer l'encapsulation.",
        "Clarifier le statut des membres de classe."
      ],
      codes: [
        `class MyClass {
          #privateField = 42;
          static #privateStaticField = "static";

          getPrivateField() {
            return this.#privateField;
          }
        }

        const instance = new MyClass();
        console.log(instance.getPrivateField()); // 42`
      ]
    },
    {
      id: "static-blocks",
      type: "bonus",
      title: "Blocs statiques",
      description: "Permettent d'effectuer une initialisation avancée dans une classe.",
      goals: [
        "Gérer des états complexes ou calculer des valeurs lors de la définition de la classe."
      ],
      codes: [
        `class MyClass {
          static counter;

          static {
            MyClass.counter = 0;
          }
        }

        console.log(MyClass.counter); // 0`
      ]
    },
    {
      id: "private-field-check",
      type: "bonus",
      title: "Syntaxe #x in obj",
      description: "Permet de vérifier la présence d'un champ privé dans un objet.",
      goals: [
        "Renforcer l'encapsulation des champs privés."
      ],
      codes: [
        `class MyClass {
          #privateField = 42;
        }

        const instance = new MyClass();
        console.log(#privateField in instance); // true`
      ]
    },
    {
      id: "regex-d-flag",
      type: "bonus",
      title: "Indices de correspondance avec le drapeau /d",
      description: "Fournit les indices des sous-chaînes correspondantes dans une regex.",
      goals: [
        "Faciliter l'extraction des positions des correspondances.",
        "Offrir un contrôle plus précis des résultats des regex."
      ],
      codes: [
        `const regex = /a(b)c/d;
        const str = "abc";
        const match = regex.exec(str);
        console.log(match.indices); // [[0, 3], [1, 2]]`
      ]
    },
    {
      id: "error-cause",
      type: "bonus",
      title: "Propriété cause sur Error",
      description: "Permet de chaîner les erreurs en enregistrant la cause d'une erreur.",
      goals: [
        "Simplifier le suivi des causes des erreurs complexes.",
        "Améliorer la lisibilité des contextes d'erreur."
      ],
      codes: [
        `try {
          throw new Error("Initial error", { cause: "Underlying issue" });
        } catch (error) {
          console.log(error.message); // "Initial error"
          console.log(error.cause); // "Underlying issue"
        }`
      ]
    },
    {
      id: "array-at-method",
      type: "bonus",
      title: "Méthode at pour Strings, Arrays et TypedArrays",
      description: "Permet d'accéder aux éléments par index relatif.",
      goals: [
        "Éviter de calculer manuellement les index négatifs.",
        "Apporter une méthode plus intuitive pour récupérer des éléments."
      ],
      codes: [
        `const arr = [1, 2, 3];
        console.log(arr.at(-1)); // 3

        const str = "hello";
        console.log(str.at(-2)); // "l"`
      ]
    },
    {
      id: "object-hasown",
      type: "bonus",
      title: "Object.hasOwn",
      description: "Alternative plus simple à Object.prototype.hasOwnProperty.",
      goals: [
        "Réduire la verbosité du code.",
        "Éviter les problèmes liés à la manipulation du prototype."
      ],
      codes: [
        `const obj = { key: "value" };
        console.log(Object.hasOwn(obj, "key")); // true`
      ]
    }
  ]
};
