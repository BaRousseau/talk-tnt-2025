export const LEVEL_STAGE_3 = {
  title: "ECMAScript Stage 3 Proposals",
  description: "Stage 3 - Spécification complète prête pour l'implémentation et les retours.",
  specialTiles: [
    {
      id: "legacy-regexp",
      type: "update",
      title: "Legacy RegExp features in JavaScript",
      description: "Ajout de fonctionnalités héritées aux expressions régulières pour une meilleure compatibilité.",
      goals: [
        "Améliorer la compatibilité avec d'autres implémentations de RegExp."
      ],
      codes: [
        `const regex = new RegExp('(?<=foo)bar');
console.log(regex.test('foobar')); // true`
      ]
    },
    {
      id: "temporal",
      type: "feature",
      title: "Temporal API",
      description: "Une nouvelle API pour la manipulation des dates et heures, plus puissante que Date().",
      goals: [
        "Offrir un support précis et fiable pour les dates et heures en JavaScript."
      ],
      codes: [
        `const now = Temporal.Now.plainDateTimeISO();
console.log(now.toString());`
      ]
    },
    {
      id: "decorators",
      type: "feature",
      title: "Decorators",
      description: "Ajoute le support des décorateurs pour modifier dynamiquement les classes et leurs méthodes.",
      goals: [
        "Simplifier la manipulation et l'extension des classes."
      ],
      codes: [
        `function log(target, key, descriptor) {
  console.log("Appel de", key);
}

class Example {
  @log
  method() {}
}`
      ]
    },
    {
      id: "json-parse-source",
      type: "feature",
      title: "JSON.parse source text access",
      description: "Permet d'accéder directement au texte source lors de l'utilisation de JSON.parse().",
      goals: [
        "Fournir plus de contexte lors du parsing JSON."
      ],
      codes: [
        `const json = '{"name":"Alice"}';
const result = JSON.parse(json, { sourceText: true });
console.log(result.sourceText); // '{"name":"Alice"}'`
      ]
    },
    {
      id: "array-from-async",
      type: "feature",
      title: "Array.fromAsync",
      description: "Ajoute une version asynchrone de Array.from().",
      goals: [
        "Faciliter la conversion d'itérables asynchrones en tableaux."
      ],
      codes: [
        `async function* asyncGen() {
  yield 1;
  yield 2;
}
const array = await Array.fromAsync(asyncGen());
console.log(array); // [1, 2]`
      ]
    },
    {
      id: "explicit-resource-management",
      type: "feature",
      title: "Explicit Resource Management",
      description: "Ajout de mécanismes explicites pour gérer les ressources et éviter les fuites mémoire.",
      goals: [
        "Améliorer la gestion des ressources comme les fichiers et connexions réseau."
      ],
      codes: [
        `using resource = new Resource();
resource.use();`
      ]
    },
    {
      id: "float16",
      type: "feature",
      title: "Float16 sur TypedArrays",
      description: "Ajout du support pour les nombres en float16 sur TypedArrays et DataView.",
      goals: [
        "Optimiser l'utilisation de la mémoire pour les nombres à virgule flottante."
      ],
      codes: [
        `const buffer = new ArrayBuffer(2);
const view = new DataView(buffer);
view.setFloat16(0, 1.5);
console.log(view.getFloat16(0)); // 1.5`
      ]
    },
    {
      id: "decorator-metadata",
      type: "feature",
      title: "Decorator Metadata",
      description: "Ajout de métadonnées aux décorateurs pour enrichir les classes.",
      goals: [
        "Faciliter l'ajout d'annotations et de métadonnées aux classes."
      ],
      codes: [
        `@metadata({ role: 'admin' })
class User {}`
      ]
    },
    {
      id: "source-phase-imports",
      type: "feature",
      title: "Source Phase Imports",
      description: "Ajout d'un mécanisme pour contrôler les imports avant leur exécution.",
      goals: [
        "Optimiser et contrôler les imports dynamiques."
      ],
      codes: [
        `import data from './data.json' with { type: 'json' };`
      ]
    },
    {
      id: "timezone-canonicalization",
      type: "update",
      title: "Time Zone Canonicalization",
      description: "Amélioration du support des fuseaux horaires en JavaScript.",
      goals: [
        "Offrir une meilleure précision des fuseaux horaires dans Temporal API."
      ],
      codes: [
        `const tz = new Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log(tz);`
      ]
    },
    {
      id: "uint8array-base64",
      type: "feature",
      title: "Uint8Array to/from Base64",
      description: "Ajoute une conversion directe entre Uint8Array et Base64.",
      goals: [
        "Simplifier l'encodage/décodage Base64 en JavaScript."
      ],
      codes: [
        `const encoded = Uint8Array.toBase64(new Uint8Array([72, 101, 108, 108, 111]));
console.log(encoded); // 'SGVsbG8='`
      ]
    },
    {
      id: "dynamic-code-brand-checks",
      type: "feature",
      title: "Dynamic Code Brand Checks",
      description: "Ajoute des vérifications dynamiques de marque pour le code évalué.",
      goals: [
        "Améliorer la sécurité et la cohérence du code dynamique."
      ],
      codes: [
        `function checkBrand(obj) {
  return obj instanceof SomeClass;
}`
      ]
    },
    {
      id: "redeclarable-global-vars",
      type: "feature",
      title: "Redeclarable Global Eval-introduced Vars",
      description: "Permet la redéclaration de variables globales introduites par eval().",
      goals: [
        "Assouplir la gestion des variables globales en mode script."
      ],
      codes: [
        `eval('var x = 10;');
eval('var x = 20;');
console.log(x); // 20`
      ]
    },
    {
      id: "regexp-escape",
      type: "feature",
      title: "RegExp.escape",
      description: "Ajoute une méthode pour échapper correctement les chaînes dans les expressions régulières.",
      goals: [
        "Faciliter la manipulation des expressions régulières dynamiques."
      ],
      codes: [
        `const escaped = RegExp.escape('Hello.');
console.log(escaped); // 'Hello\\.'`
      ]
    },
    {
      id: "atomics-pause",
      type: "feature",
      title: "Atomics.pause",
      description: "Ajoute une méthode pour suspendre un thread atomiquement.",
      goals: [
        "Améliorer les performances des opérations multi-threadées."
      ],
      codes: [
        `Atomics.pause(new Int32Array(new SharedArrayBuffer(4)), 0, 1000);`
      ]
    },
    {
      id: "error-iserror",
      type: "feature",
      title: "Error.isError",
      description: "Ajoute une méthode standard pour vérifier si une valeur est une erreur.",
      goals: [
        "Simplifier la gestion des erreurs en JavaScript."
      ],
      codes: [
        `console.log(Error.isError(new Error())); // true`
      ]
    },
    {
      id: "error-iserror",
      type: "feature",
      title: "Intl.Locale Info (Ecma 402)",
      description: "API pour exposer des informations locales, telles que le premier jour de la semaine ou d'autres paramètres régionaux.",
      goals: [
        "Accès facile et complet aux paramètres régionaux et à leurs spécificités.",
        "Améliore l'expérience utilisateur en fonction de la région ou de la culture."
      ],
      codes: [
        `let he = new Intl.Locale("he")
he.getWeekInfo()
// {firstDay: 7, weekend: [5, 6], minimalDays: 1}
let af = new Intl.Locale("af")
af.getWeekInfo()
// {firstDay: 7, weekend: [6, 7], minimalDays: 1}
enGB = new Intl.Locale("en-GB")
enGB.getWeekInfo()
// {firstDay: 1, weekend: [6, 7], minimalDays: 4}

let msBN = new Intl.Locale("ms-BN")
msBN.getWeekInfo()
// {firstDay: 7, weekend: [5, 7], minimalDays: 1}  // Brunei weekend is Friday and Sunday but not Saturday`
      ]
    }
  ]
};
