export const LEVEL_STAGE_POPULAR = {
  id: 'ecmascript-stage-popular',
  shortTitle: 'Stage Tendance',
  title: "ECMAScript Propositions les plus demandées",
  description: "Les propositions les plus demandées qui pourraient être intégrées dans les futures versions d'ECMAScript.",
  specialTiles: [
    {
      id: "observable",
      type: "treasure",
      title: "[Stage 1] Observable",
      description: "Une proposition pour introduire un type natif `Observable` en JavaScript, permettant de gérer des flux de données asynchrones. Cette fonctionnalité est largement utilisée dans des bibliothèques comme RxJS et est au cœur de la programmation réactive.",
      goals: [
        "Permettre une gestion native des flux de données asynchrones.",
        "Faciliter l'adoption de la programmation réactive.",
        "Améliorer l'interopérabilité avec des bibliothèques comme RxJS."
      ],
      codes: [
        `const observable = new Observable(observer => {
    observer.next(1);
    observer.next(2);
    observer.complete();
  });
  
  observable.subscribe({
    next: value => console.log(value),
    complete: () => console.log('Done')
  });`
      ]
    },
    {
      id: "pattern-matching",
      type: "treasure",
      title: "[Stage 1] Pattern Matching",
      description: "Une proposition pour introduire le pattern matching en JavaScript, permettant de comparer des structures de données complexes de manière expressive. Cette fonctionnalité est très attendue pour simplifier la gestion des états dans des frameworks comme React ou Redux.",
      goals: [
        "Permettre une syntaxe plus concise pour la comparaison de structures de données.",
        "Faciliter la gestion des conditions complexes.",
        "Améliorer la lisibilité du code."
      ],
      codes: [
        `const result = match(value) {
    case { type: 'success', data } => \`Success: \${data}\`,
    case { type: 'error', message } => \`Error: \${message}\`,
    case _ => 'Unknown'
  };`
      ]
    },
    {
      id: "partial-application",
      type: "treasure",
      title: "[Stage 1] Partial Application",
      description: "Une proposition pour permettre l'application partielle des fonctions, permettant de créer de nouvelles fonctions en fixant certains arguments. Cette fonctionnalité est couramment utilisée dans des bibliothèques comme Lodash ou Ramda pour la composition de fonctions.",
      goals: [
        "Permettre une syntaxe plus concise pour l'application partielle.",
        "Faciliter la création de fonctions spécialisées.",
        "Améliorer la réutilisabilité du code."
      ],
      codes: [
        `const add = (a, b) => a + b;
  const addFive = add(?, 5);
  console.log(addFive(10)); // 15`
      ]
    },
    {
      id: "do-expressions",
      type: "treasure",
      title: "[Stage 1] do Expressions",
      description: "Une proposition pour introduire des expressions `do`, permettant d'utiliser des blocs de code comme des expressions. Cette fonctionnalité est utile pour les développeurs travaillant avec des bibliothèques fonctionnelles ou des frameworks comme React.",
      goals: [
        "Permettre une syntaxe plus concise pour les blocs de code.",
        "Faciliter l'écriture de code fonctionnel.",
        "Améliorer la lisibilité du code."
      ],
      codes: [
        `const result = do {
    const x = 1;
    const y = 2;
    x + y;
  };`
      ]
    },
    {
      id: "decimal",
      type: "treasure",
      title: "[Stage 1] Decimal",
      description: "Une proposition pour introduire un type natif `Decimal` en JavaScript, permettant des calculs décimaux précis. Cette fonctionnalité est essentielle pour les applications financières, scientifiques ou de calcul précis, et pourrait remplacer des bibliothèques comme `decimal.js`.",
      goals: [
        "Permettre des calculs décimaux précis sans perte de précision.",
        "Faciliter les applications financières et scientifiques.",
        "Améliorer la fiabilité des calculs en JavaScript."
      ],
      codes: [
        `const total = Decimal('0.1') + Decimal('0.2');
  console.log(total.toString()); // "0.3"`
      ]
    },
    {
      id: "pipeline-operator",
      type: "treasure",
      title: "[Stage 2] Pipeline Operator",
      description: "Une proposition pour introduire un opérateur de pipeline (`|>`), permettant de chaîner des opérations de manière plus lisible. Cette fonctionnalité est très utile pour les bibliothèques comme Lodash ou Ramda, et pour les développeurs adoptant un style de programmation fonctionnelle.",
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
      id: "record-and-tuple",
      type: "treasure",
      title: "[Stage 2] Record & Tuple",
      description: "Une proposition pour introduire des types immuables pour les objets et les tableaux, appelés Records et Tuples, permettant une meilleure gestion des données immuables. Cette fonctionnalité est particulièrement utile pour les frameworks comme React ou Redux, où l'immutabilité est essentielle.",
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
      id: "error-stacks",
      type: "treasure",
      title: "[Stage 1] Error Stacks",
      description: "Une proposition pour améliorer la gestion des piles d'erreurs en JavaScript, permettant une meilleure traçabilité des erreurs. Cette fonctionnalité est essentielle pour le débogage dans des applications complexes et asynchrones, et bénéficierait à tous les frameworks et bibliothèques JavaScript.",
      goals: [
        "Permettre une meilleure traçabilité des erreurs.",
        "Faciliter le débogage des applications JavaScript.",
        "Améliorer la lisibilité des piles d'erreurs."
      ],
      codes: [] // Aucun exemple de code disponible
    },
    {
      id: "ses-secure-ecmascript",
      type: "treasure",
      title: "[Stage 1] SES (Secure EcmaScript)",
      description: "Une proposition pour introduire un environnement d'exécution sécurisé en JavaScript, permettant d'exécuter du code non fiable de manière isolée. Cette fonctionnalité est cruciale pour les applications qui exécutent du code non fiable, comme les extensions de navigateur ou les sandboxes cloud.",
      goals: [
        "Permettre une exécution sécurisée de code non fiable.",
        "Faciliter la création de sandboxes JavaScript.",
        "Améliorer la sécurité des applications JavaScript."
      ],
      codes: [] // Aucun exemple de code disponible
    },
    {
      id: "type-annotations",
      type: "treasure",
      title: "[Stage 1] Type Annotations",
      description: "Une proposition pour introduire des annotations de type en JavaScript, permettant une meilleure maintenabilité et sécurité du code. Cette fonctionnalité est très demandée pour améliorer la qualité du code dans les grands projets et pourrait faciliter l'adoption de TypeScript ou d'autres outils de typage statique.",
      goals: [
        "Permettre une meilleure maintenabilité du code grâce au typage.",
        "Faciliter l'adoption de TypeScript ou d'autres outils de typage.",
        "Améliorer la sécurité et la fiabilité du code."
      ],
      codes: [
        `function add(a: number, b: number): number {
    return a + b;
  }`
      ]
    },
    {
      id: "cancellation-api",
      type: "treasure",
      title: "[Stage 1] Cancellation API",
      description: "Une proposition pour introduire une API native pour annuler des opérations asynchrones, comme des requêtes ou des timeouts. Cette fonctionnalité est très utile pour les bibliothèques de gestion de requêtes comme Axios ou Fetch API, et pour les applications asynchrones complexes.",
      goals: [
        "Permettre une annulation facile des opérations asynchrones.",
        "Faciliter la gestion des annulations dans les applications complexes.",
        "Améliorer la fiabilité des applications asynchrones."
      ],
      codes: [
        `const controller = new CancellationController();
  const signal = controller.signal;
  
  fetch(url, { signal })
    .then(response => response.json())
    .catch(err => {
      if (err.name === 'AbortError') {
        console.log('Request aborted');
      }
    });
  
  controller.abort(); // Annule la requête`
      ]
    },
    {
      id: "string-codepoints",
      type: "treasure",
      title: "[Stage 1] String.prototype.codePoints",
      description: "Une proposition pour ajouter une méthode `codePoints` aux chaînes de caractères, permettant de manipuler les points de code Unicode. Cette fonctionnalité est essentielle pour les applications internationalisées et les bibliothèques de gestion de texte.",
      goals: [
        "Permettre une manipulation plus facile des points de code Unicode.",
        "Faciliter le traitement des chaînes de caractères internationalisées.",
        "Améliorer la compatibilité avec les normes Unicode."
      ],
      codes: [
        `const str = '😃🎉';
  const codePoints = str.codePoints();
  console.log([...codePoints]); // [128515, 127881]`
      ]
    },
    {
      id: "array-unique",
      type: "treasure",
      title: "[Stage 1] Array.prototype.unique()",
      description: "Une proposition pour ajouter une méthode `unique` aux tableaux, permettant de retourner un nouveau tableau avec des éléments uniques. Cette fonctionnalité est souvent implémentée manuellement ou via des bibliothèques comme Lodash ou Underscore.js.",
      goals: [
        "Permettre une syntaxe plus concise pour obtenir des éléments uniques.",
        "Faciliter la manipulation des tableaux sans avoir à utiliser des bibliothèques externes.",
        "Améliorer la lisibilité du code."
      ],
      codes: [
        `const arr = [1, 2, 2, 3, 3, 3];
  const uniqueArr = arr.unique();
  console.log(uniqueArr); // [1, 2, 3]`
      ]
    },
    {
      id: "signals",
      type: "treasure",
      title: "[Stage 1] Signals",
      description: "Une proposition pour introduire un système de signaux natif en JavaScript, permettant une gestion réactive des données. Cette fonctionnalité est au cœur des frameworks modernes comme Solid.js ou Preact, et pourrait simplifier la réactivité dans les applications JavaScript.",
      goals: [
        "Permettre une gestion réactive des données sans avoir à utiliser des bibliothèques externes.",
        "Faciliter l'adoption de la programmation réactive dans les frameworks.",
        "Améliorer les performances des applications réactives."
      ],
      codes: [
        `const controller = new AbortController();
const signal = controller.signal;

fetch('https://example.com/data', { signal })
  .then(response => response.json())
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('La requête a été annulée.');
    }
  });

// Annuler la requête après 2 secondes
setTimeout(() => controller.abort(), 2000);`,
        `const signalController = new SignalController();
const signal = signalController.signal;

Promise.all([
  fetch('https://example.com/data1', { signal }),
  fetch('https://example.com/data2', { signal }),
  fetch('https://example.com/data3', { signal })
])
  .then(responses => {
    console.log('Réponses reçues', responses);
  })
  .catch(error => {
    if (error.name === 'SignalError') {
      console.log('Toutes les requêtes ont été annulées.');
    }
  });

// Annuler après 3 secondes
setTimeout(() => signalController.abort(), 3000);`,
        `const signalController = new SignalController();
const signal = signalController.signal;

async function longRunningTask(signal) {
  while (!signal.aborted) {
    // Effectuer des tâches à intervalles réguliers
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Tâche en cours...');
  }
  console.log('Tâche annulée.');
}

longRunningTask(signal);

// Annuler après 5 secondes
setTimeout(() => signalController.abort(), 5000);
`
      ]
    },
    {
      id: "concurrency-control",
      type: "treasure",
      title: "[Stage 1] Concurrency Control",
      description: "Une proposition pour améliorer la gestion de la concurrence en JavaScript, en particulier pour les applications utilisant des Web Workers ou des opérations asynchrones complexes. Cette fonctionnalité est essentielle pour les frameworks comme React (avec React Server Components) et les applications multi-threadées.",
      goals: [
        "Permettre une meilleure gestion de la concurrence dans les applications modernes.",
        "Faciliter l'utilisation des Web Workers et des opérations asynchrones.",
        "Améliorer les performances des applications multi-threadées."
      ],
      codes: [] // Aucun exemple de code disponible
    }
  ]
};