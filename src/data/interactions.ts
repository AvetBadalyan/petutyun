/**
 * Medication Interaction Checker
 * 
 * This is the other "real logic" feature - checking for dangerous drug combinations.
 * 
 * How it works:
 * 1. Each medication has an active ingredient
 * 2. We have a database of known interactions between ingredients
 * 3. When a pet is on multiple medications, we check all pairs for interactions
 * 4. We return warnings with severity levels
 * 
 * IMPORTANT: This is DEMO DATA for portfolio purposes - NOT medical advice!
 */

export interface Interaction {
  // The two ingredients that interact
  ingredientA: string;
  ingredientB: string;
  // How serious is this interaction?
  severity: "avoid" | "caution" | "monitor";
  // Human-readable explanation
  reason: string;
}

/**
 * Interaction database
 * 
 * Real veterinary drug interactions - simplified for demo purposes.
 * In production, this would come from a proper pharmaceutical database.
 */
export const interactions: Interaction[] = [
  // NSAIDs should never be combined
  {
    ingredientA: "Carprofen",
    ingredientB: "Meloxicam",
    severity: "avoid",
    reason:
      "Two NSAIDs together sharply increase the risk of stomach ulcers and kidney damage. Never combine.",
  },
  // NSAID + Steroid = bad
  {
    ingredientA: "Carprofen",
    ingredientB: "Prednisolone",
    severity: "avoid",
    reason:
      "Combining an NSAID with a corticosteroid can cause serious gastrointestinal bleeding.",
  },
  {
    ingredientA: "Meloxicam",
    ingredientB: "Prednisolone",
    severity: "avoid",
    reason:
      "NSAID and steroid together greatly increases ulcer risk. Requires a vet-directed washout period between.",
  },
  // Sedatives
  {
    ingredientA: "Gabapentin",
    ingredientB: "Trazodone",
    severity: "caution",
    reason:
      "Both are sedating. Combined use can cause excessive drowsiness — monitor closely and reduce activity.",
  },
  // Serotonin syndrome risk
  {
    ingredientA: "Fluoxetine",
    ingredientB: "Trazodone",
    severity: "caution",
    reason:
      "Risk of serotonin syndrome when stacked. Use only under veterinary supervision with dose adjustments.",
  },
  // Blood thinning
  {
    ingredientA: "Omega-3 Fatty Acids",
    ingredientB: "Carprofen",
    severity: "monitor",
    reason:
      "Both can mildly affect blood clotting. Generally fine, but monitor for unusual bruising or bleeding.",
  },
  // Parasite medications
  {
    ingredientA: "Ivermectin",
    ingredientB: "Milbemycin Oxime",
    severity: "avoid",
    reason:
      "Overlapping macrocyclic lactones can cause neurotoxicity, especially in MDR1-sensitive breeds (Collies, Aussies).",
  },
  // Absorption interference
  {
    ingredientA: "Calcium Carbonate",
    ingredientB: "Enrofloxacin",
    severity: "caution",
    reason:
      "Calcium binds to the antibiotic and reduces absorption. Separate doses by at least 2 hours.",
  },
  // Thyroid medication
  {
    ingredientA: "Levothyroxine",
    ingredientB: "Calcium Carbonate",
    severity: "caution",
    reason:
      "Calcium can reduce thyroid medication absorption. Give thyroid meds on empty stomach, calcium with food.",
  },
  // ACE inhibitors + potassium
  {
    ingredientA: "Enalapril",
    ingredientB: "Potassium Supplements",
    severity: "monitor",
    reason:
      "ACE inhibitors can raise potassium levels. Monitor for signs of hyperkalemia if supplementing.",
  },
];

/**
 * Find interaction between two specific ingredients
 */
export function findInteraction(
  ingredientA: string,
  ingredientB: string
): Interaction | undefined {
  return interactions.find(
    (i) =>
      (i.ingredientA === ingredientA && i.ingredientB === ingredientB) ||
      (i.ingredientA === ingredientB && i.ingredientB === ingredientA)
  );
}

/**
 * Check all pairwise interactions for a list of ingredients
 * 
 * This is O(n²) but n is always small (few medications per pet)
 */
export function checkInteractions(ingredients: string[]): Interaction[] {
  const found: Interaction[] = [];

  // Check each pair
  for (let i = 0; i < ingredients.length; i++) {
    for (let j = i + 1; j < ingredients.length; j++) {
      const interaction = findInteraction(ingredients[i], ingredients[j]);
      if (interaction) {
        found.push(interaction);
      }
    }
  }

  // Sort by severity (avoid first, then caution, then monitor)
  const severityOrder = { avoid: 0, caution: 1, monitor: 2 };
  return found.sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
  );
}

/**
 * Get severity color classes for UI
 */
export function getSeverityStyles(severity: Interaction["severity"]) {
  switch (severity) {
    case "avoid":
      return {
        bg: "bg-red-100 dark:bg-red-950",
        text: "text-red-700 dark:text-red-300",
        border: "border-red-300 dark:border-red-800",
        label: "AVOID",
      };
    case "caution":
      return {
        bg: "bg-amber-100 dark:bg-amber-950",
        text: "text-amber-700 dark:text-amber-300",
        border: "border-amber-300 dark:border-amber-800",
        label: "CAUTION",
      };
    case "monitor":
      return {
        bg: "bg-blue-100 dark:bg-blue-950",
        text: "text-blue-700 dark:text-blue-300",
        border: "border-blue-300 dark:border-blue-800",
        label: "MONITOR",
      };
  }
}
