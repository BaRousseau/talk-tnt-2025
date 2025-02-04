export const LEVEL_STAGE_2 = {
  title: "ECMAScript Stage 2 Proposals",
  description: "Stage 2 - Première version des spécifications avec détails techniques.",
  specialTiles: [
    {
      id: "function-sent-metaproperty",
      type: "treasure",
      title: "Function.sent Metaproperty",
      description: "Une proposition pour introduire une métapropriété `function.sent` permettant d'accéder à la valeur envoyée à un générateur via `next()`.",
      goals: [
        "Faciliter l'accès à la valeur passée à un générateur.",
        "Améliorer la lisibilité et la maintenabilité du code utilisant des générateurs.",
        "Permettre des patterns plus expressifs avec les générateurs."
      ],
      codes: [
        `function* generator() {
    console.log(function.sent); // Affiche la valeur passée à next()
    yield;
  }
  
  const gen = generator();
  gen.next(42); // Affiche 42`
      ]
    },
    {
      id: "throw-expressions",
      type: "treasure",
      title: "Throw Expressions",
      description: "Une proposition pour permettre l'utilisation de `throw` dans des expressions, permettant de lever des erreurs dans des contextes où une expression est attendue.",
      goals: [
        "Permettre une syntaxe plus concise pour lever des erreurs.",
        "Faciliter l'utilisation de `throw` dans des expressions ternaires ou des valeurs par défaut.",
        "Améliorer la lisibilité du code en évitant des structures `if/throw` redondantes."
      ],
      codes: [
        `const value = someCondition ? 42 : throw new Error('Invalid condition');`
      ]
    },
    {
      id: "function-implementation-hiding",
      type: "treasure",
      title: "Function Implementation Hiding",
      description: "Une proposition pour permettre de masquer l'implémentation d'une fonction, rendant son code source inaccessible.",
      goals: [
        "Protéger le code source des fonctions sensibles.",
        "Permettre une meilleure encapsulation et sécurité.",
        "Faciliter la distribution de code sans exposer l'implémentation."
      ],
      codes: [] // Aucun exemple de code disponible
    },
    {
      id: "collection-normalization",
      type: "treasure",
      title: "Collection Normalization",
      description: "Une proposition pour normaliser les collections (comme les `Map` et `Set`) afin de garantir un comportement cohérent entre les différentes implémentations.",
      goals: [
        "Assurer une cohérence entre les différentes implémentations de collections.",
        "Faciliter l'interopérabilité entre les environnements JavaScript.",
        "Améliorer la fiabilité des opérations sur les collections."
      ],
      codes: [] // Aucun exemple de code disponible
    },
    {
      id: "istemplateobject",
      type: "treasure",
      title: "isTemplateObject",
      description: "Une proposition pour introduire une méthode `isTemplateObject` permettant de vérifier si un objet est un objet de modèle littéral (template literal).",
      goals: [
        "Permettre une meilleure validation des objets de modèle littéral.",
        "Faciliter la détection des templates littéraux pour des raisons de sécurité ou de débogage.",
        "Améliorer la manipulation des templates littéraux."
      ],
      codes: [
        `const template = (strings, ...values) => {
    if (!isTemplateObject(strings)) {
      throw new Error('Invalid template literal');
    }
    return String.raw(strings, ...values);
  };`
      ]
    },
    {
      id: "map-prototype-emplace",
      type: "treasure",
      title: "Map.prototype.emplace",
      description: "Une proposition pour ajouter une méthode `emplace` à `Map`, permettant d'insérer ou de mettre à jour une valeur de manière atomique.",
      goals: [
        "Simplifier la gestion des entrées dans les `Map`.",
        "Permettre des opérations atomiques d'insertion et de mise à jour.",
        "Améliorer les performances en évitant les vérifications manuelles."
      ],
      codes: [
        `const map = new Map();
  map.emplace('key', {
    insert: () => 'new value',
    update: (existing) => existing + ' updated'
  });`
      ]
    },
    {
      id: "dynamic-import-host-adjustment",
      type: "treasure",
      title: "Dynamic Import Host Adjustment",
      description: "Une proposition pour ajuster le comportement de l'importation dynamique (`import()`) afin de mieux s'intégrer avec les environnements hôtes.",
      goals: [
        "Permettre une meilleure intégration avec les environnements hôtes (comme les navigateurs ou Node.js).",
        "Faciliter la gestion des modules dynamiques dans des contextes spécifiques.",
        "Améliorer la flexibilité de l'importation dynamique."
      ],
      codes: [] // Aucun exemple de code disponible
    },
    {
      id: "record-and-tuple",
      type: "treasure",
      title: "Record & Tuple",
      description: "Une proposition pour introduire des types immuables pour les objets et les tableaux, appelés Records et Tuples, permettant une meilleure gestion des données immuables.",
      goals: [
        "Fournir des structures de données immuables par défaut.",
        "Faciliter la comparaison profonde et le partage de données.",
        "Améliorer les performances en évitant les copies inutiles."
      ],
      codes: [
        `const record = #{ x: 1, y: 2 };
  const tuple = #[1, 2, 3];
  
  console.log(record.x); // 1
  console.log(tuple[0]); // 1`
      ]
    },
    {
      id: "module-expressions",
      type: "treasure",
      title: "Module Expressions",
      description: "Une proposition pour permettre l'utilisation d'expressions de module, permettant de créer des modules dynamiquement.",
      goals: [
        "Permettre la création dynamique de modules.",
        "Faciliter la modularité et la réutilisabilité du code.",
        "Améliorer l'intégration avec des systèmes de chargement de modules dynamiques."
      ],
      codes: [
        `const module = module {
    export const foo = 'bar';
  };`
      ]
    },
    {
      id: "pipeline-operator",
      type: "treasure",
      title: "Pipeline Operator",
      description: "Une proposition pour introduire un opérateur de pipeline (`|>`) permettant de chaîner des opérations de manière plus lisible.",
      goals: [
        "Améliorer la lisibilité des chaînes d'opérations.",
        "Permettre une composition plus fluide des fonctions.",
        "Faciliter l'écriture de code fonctionnel."
      ],
      codes: [
        `const result = value
    |> double
    |> increment
    |> square;`
      ]
    },
    {
      id: "destructure-private-fields",
      type: "treasure",
      title: "Destructure Private Fields",
      description: "Une proposition pour permettre la déstructuration des champs privés dans les classes.",
      goals: [
        "Permettre une syntaxe plus concise pour accéder aux champs privés.",
        "Faciliter la manipulation des objets avec des champs privés.",
        "Améliorer la lisibilité du code."
      ],
      codes: [
        `class MyClass {
    #privateField = 42;
    destructure() {
      const { #privateField: value } = this;
      return value;
    }
  }`
      ]
    },
    {
      id: "regexp-buffer-boundaries",
      type: "treasure",
      title: "RegExp Buffer Boundaries",
      description: "Une proposition pour ajouter des ancres de début et de fin (`\A`, `\z`, `\Z`) aux expressions régulières pour mieux gérer les limites de buffer.",
      goals: [
        "Permettre une meilleure gestion des limites de buffer dans les expressions régulières.",
        "Faciliter la validation des chaînes dans des contextes spécifiques.",
        "Améliorer la précision des expressions régulières."
      ],
      codes: [
        `const regex = /\Astart\z/;
  regex.test('start'); // true`
      ]
    },
    {
      id: "string-dedent",
      type: "treasure",
      title: "String.dedent",
      description: "Une proposition pour ajouter une méthode `dedent` aux chaînes de caractères, permettant de supprimer l'indentation inutile.",
      goals: [
        "Simplifier la gestion des chaînes multilignes.",
        "Permettre une meilleure lisibilité des chaînes indentées.",
        "Faciliter la manipulation des templates littéraux."
      ],
      codes: [
        `const str = String.dedent\`
      This is a
      dedented string
    \`;`
      ]
    },
    {
      id: "json-parseimmutable",
      type: "treasure",
      title: "JSON.parseImmutable",
      description: "Une proposition pour ajouter une méthode `parseImmutable` à `JSON`, permettant de parser du JSON en objets immuables.",
      goals: [
        "Permettre la création d'objets immuables directement à partir de JSON.",
        "Faciliter la gestion des données immuables.",
        "Améliorer les performances en évitant les copies inutiles."
      ],
      codes: [
        `const data = JSON.parseImmutable('{"key": "value"}');
  console.log(data.key); // "value"`
      ]
    },
    {
      id: "module-declarations",
      type: "treasure",
      title: "Module Declarations",
      description: "Une proposition pour permettre des déclarations de module plus flexibles, y compris des modules imbriqués.",
      goals: [
        "Permettre une meilleure organisation des modules.",
        "Faciliter la modularité et la réutilisabilité du code.",
        "Améliorer l'intégration avec des systèmes de chargement de modules dynamiques."
      ],
      codes: [] // Aucun exemple de code disponible
    },
    {
      id: "symbol-predicates",
      type: "treasure",
      title: "Symbol Predicates",
      description: "Une proposition pour ajouter des prédicats aux symboles, permettant de vérifier des propriétés spécifiques.",
      goals: [
        "Permettre une meilleure validation des symboles.",
        "Faciliter la manipulation des symboles dans des contextes spécifiques.",
        "Améliorer la sécurité et la fiabilité du code."
      ],
      codes: [] // Aucun exemple de code disponible
    },
    {
      id: "async-iterator-helpers",
      type: "treasure",
      title: "Async Iterator Helpers",
      description: "Une proposition pour ajouter des méthodes utilitaires aux itérateurs asynchrones, similaires à celles des itérateurs synchrones.",
      goals: [
        "Simplifier la manipulation des itérateurs asynchrones.",
        "Permettre une meilleure composition des opérations asynchrones.",
        "Améliorer la lisibilité du code asynchrone."
      ],
      codes: [
        `const asyncIter = [1, 2, 3].values();
  for await (const value of asyncIter.map(x => x * 2)) {
    console.log(value);
  }`
      ]
    },
    {
      id: "iterator-range",
      type: "treasure",
      title: "Iterator.range",
      description: "Une proposition pour ajouter une méthode `range` aux itérateurs, permettant de générer des séquences de nombres facilement.",
      goals: [
        "Simplifier la génération de séquences de nombres.",
        "Permettre une syntaxe plus concise pour les boucles.",
        "Améliorer la lisibilité du code."
      ],
      codes: [
        `for (const num of Iterator.range(1, 5)) {
    console.log(num); // 1, 2, 3, 4
  }`
      ]
    },
    {
      id: "async-context",
      type: "treasure",
      title: "Async Context",
      description: "Une proposition pour introduire un contexte asynchrone, permettant de suivre l'exécution asynchrone à travers les promesses et les callbacks.",
      goals: [
        "Permettre un meilleur suivi de l'exécution asynchrone.",
        "Faciliter le débogage des applications asynchrones.",
        "Améliorer la gestion des contextes dans les applications complexes."
      ],
      codes: [] // Aucun exemple de code disponible
    },
    {
      id: "esm-phase-imports",
      type: "treasure",
      title: "ESM Phase Imports",
      description: "Une proposition pour permettre des imports par phase dans les modules ECMAScript, permettant de charger des modules en fonction de leur phase d'exécution.",
      goals: [
        "Permettre une meilleure gestion des dépendances par phase.",
        "Faciliter l'optimisation du chargement des modules.",
        "Améliorer les performances des applications modulaires."
      ],
      codes: [] // Aucun exemple de code disponible
    },
    {
      id: "discard-bindings",
      type: "treasure",
      title: "Discard (void) Bindings",
      description: "Une proposition pour permettre des liaisons `void` (discard) dans les déclarations, permettant d'ignorer des valeurs inutiles.",
      goals: [
        "Permettre une syntaxe plus concise pour ignorer des valeurs.",
        "Faciliter la manipulation des structures de données complexes.",
        "Améliorer la lisibilité du code."
      ],
      codes: [
        `const [, , third] = [1, 2, 3];
  console.log(third); // 3`
      ]
    },
    {
      id: "propagate-active-scriptormodule",
      type: "treasure",
      title: "Propagate active ScriptOrModule with JobCallback Record",
      description: "Une proposition pour propager l'information du script ou module actif dans les enregistrements de rappel de travail.",
      goals: [
        "Permettre un meilleur suivi des scripts et modules actifs.",
        "Faciliter le débogage et la gestion des contextes d'exécution.",
        "Améliorer la sécurité et la fiabilité des applications."
      ],
      codes: [] // Aucun exemple de code disponible
    },
    {
      id: "structs",
      type: "treasure",
      title: "Structs: Fixed Layout Objects and Some Synchronization Primitives",
      description: "Une proposition pour introduire des objets à disposition fixe (structs) en JavaScript, permettant une meilleure gestion de la mémoire et des performances.",
      goals: [
        "Permettre une meilleure gestion de la mémoire avec des objets à disposition fixe.",
        "Améliorer les performances pour des cas d'utilisation spécifiques.",
        "Faciliter l'interopérabilité avec des langages de bas niveau."
      ],
      codes: [] // Aucun exemple de code disponible
    },
    {
      id: "extractors",
      type: "treasure",
      title: "Extractors",
      description: "Une proposition pour introduire des extracteurs, permettant de déstructurer des objets de manière personnalisée.",
      goals: [
        "Permettre une déstructuration personnalisée des objets.",
        "Faciliter la manipulation des structures de données complexes.",
        "Améliorer la lisibilité et la maintenabilité du code."
      ],
      codes: [] // Aucun exemple de code disponible
    },
    {
      id: "iterator-chunking",
      type: "treasure",
      title: "Iterator Chunking",
      description: "Une proposition pour permettre le découpage des itérateurs en morceaux (chunks), facilitant le traitement de grandes séquences de données.",
      goals: [
        "Permettre un traitement plus efficace des grandes séquences de données.",
        "Faciliter la manipulation des itérateurs en morceaux.",
        "Améliorer les performances pour des cas d'utilisation spécifiques."
      ],
      codes: [] // Aucun exemple de code disponible
    },
    {
      id: "immutable-arraybuffers",
      type: "treasure",
      title: "Immutable ArrayBuffers",
      description: "Une proposition pour introduire des `ArrayBuffer` immuables, permettant une meilleure gestion de la mémoire partagée.",
      goals: [
        "Permettre une meilleure gestion de la mémoire partagée.",
        "Améliorer la sécurité en évitant les modifications accidentelles.",
        "Faciliter l'interopérabilité avec des langages de bas niveau."
      ],
      codes: [] // Aucun exemple de code disponible
    }
  ]
};
