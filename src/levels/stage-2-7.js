export const LEVEL_STAGE_2_7 = {
  id: 'ecmascript-stage-2-7',
  shortTitle: 'Stage 2.7',
  title: "ECMAScript Stage 2.7 Proposals",
  specialTiles: [
    {
      id: "shadowrealm",
      type: "treasure",
      title: "ShadowRealm",
      description: "Une nouvelle API permettant d'exécuter du code dans un environnement isolé, similaire à un `Realm`, mais sans accès partagé aux objets globales.",
      goals: [
        "Fournir un moyen sécurisé d'exécuter du code sans interférer avec l'environnement global.",
        "Améliorer l'isolation des scripts pour des cas d'utilisation comme le sandboxing.",
        "Éviter les fuites de mémoire et améliorer la sécurité en restreignant l'accès au contexte global."
      ],
      codes: [
        `const realm = new ShadowRealm();
    
    const result = realm.evaluate(\`
      globalThis.foo = 42;
      foo;
    \`);
    
    console.log(result); // 42
    
    console.log(typeof globalThis.foo); // "undefined" (foo n'existe pas dans le monde principal)`
      ]
    },
    {
      id: "math-sumprecise",
      type: "treasure",
      title: "Math.sumPrecise",
      description: "Une nouvelle méthode pour effectuer des sommes numériques avec une meilleure précision, en réduisant les erreurs d'arrondi.",
      goals: [
        "Améliorer la précision des calculs de sommes en réduisant les erreurs d'arrondi dues aux flottants.",
        "Fournir une solution native pour additionner efficacement de grandes séries de nombres.",
        "Éviter d'avoir à implémenter des algorithmes maison de sommation compensée."
      ],
      codes: [
        `console.log(0.1 + 0.2); 
    // 0.30000000000000004 (erreur d'arrondi)
    
    console.log(Math.sumPrecise(0.1, 0.2)); 
    // 0.3 (résultat exact)`
      ]
    },
    {
      id: "deferring-module-evaluation",
      type: "treasure",
      title: "Deferring Module Evaluation",
      description: "Une amélioration du système de modules permettant de différer l’évaluation d'un module jusqu'à son premier accès.",
      goals: [
        "Réduire le coût initial de chargement des modules en ne les évaluant que lorsqu'ils sont utilisés.",
        "Optimiser les performances des applications en évitant l'exécution immédiate des modules non nécessaires.",
        "Améliorer l'expérience utilisateur en réduisant les temps de démarrage des applications JavaScript."
      ],
      codes: [
        `const modulePromise = import("./heavyModule.js", { defer: true });
    
    // Le module n'est pas évalué immédiatement, seulement lorsqu'il est utilisé.
    async function useModule() {
      const module = await modulePromise;
      module.doSomething();
    }`
      ]
    },
    {
      id: "joint-iteration",
      type: "treasure",
      title: "Joint Iteration",
      description: "Une nouvelle capacité permettant d'itérer efficacement sur plusieurs objets simultanément.",
      goals: [
        "Faciliter l'itération parallèle sur plusieurs structures de données.",
        "Réduire la complexité et améliorer la lisibilité du code pour les boucles multi-itérateurs.",
        "Optimiser les performances en évitant la gestion manuelle des index et des `next()` individuels."
      ],
      codes: [
        `const iter1 = [1, 2, 3][Symbol.iterator]();
    const iter2 = ['a', 'b', 'c'][Symbol.iterator]();
    
    for (const [num, char] of JointIteration(iter1, iter2)) {
      console.log(num, char);
    }
    // 1 "a"
    // 2 "b"
    // 3 "c"`
      ]
    },
    {
      id: "iterator-sequencing",
      type: "treasure",
      title: "Iterator Sequencing",
      description: "Une nouvelle fonctionnalité permettant de chaîner et de séquencer des itérateurs de manière fluide et intuitive.",
      goals: [
        "Permettre la composition d'itérateurs pour créer des séquences complexes.",
        "Simplifier la gestion des itérateurs en évitant les structures de contrôle imbriquées.",
        "Améliorer la modularité et la réutilisabilité du code en permettant de combiner des itérateurs existants."
      ],
      codes: [
        `const numbers = [1, 2, 3][Symbol.iterator]();
    const letters = ['a', 'b', 'c'][Symbol.iterator]();
    
    const sequencedIterator = IteratorSequence(numbers, letters);
    
    for (const value of sequencedIterator) {
      console.log(value);
    }
    // 1
    // 2
    // 3
    // "a"
    // "b"
    // "c"`
      ]
    }
  ]
};
