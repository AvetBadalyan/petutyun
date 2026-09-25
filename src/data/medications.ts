/**
 * Medications Database
 * 
 * Common pet medications with dosage rules for the calculator.
 * Each medication has:
 * - Basic info (name, description, category)
 * - Active ingredient (for interaction checking)
 * - Dosage rule (for weight-based calculation)
 * - Warnings and contraindications
 * 
 * IMPORTANT: This is DEMO DATA - NOT medical advice!
 */

export interface DosageRule {
  // Amount per kg of body weight
  perKg: number;
  // Unit of measurement
  unit: "mg" | "mL" | "IU" | "tablet";
  // How often to give
  frequency: string;
  // Minimum weight for this medication
  minWeightKg: number;
  // Maximum single dose (ceiling)
  maxDose?: number;
  // Additional instructions
  notes?: string;
}

export interface Medication {
  id: string;
  name: string;
  category: "pain-relief" | "flea-tick" | "antibiotic" | "supplement" | "heart" | "anxiety";
  description: string;
  activeIngredient: string;
  dosage: DosageRule;
  warnings: string[];
  requiresPrescription: boolean;
  // Which species is this for?
  forSpecies: ("dog" | "cat" | "both")[];
}

export const medications: Medication[] = [
  // === PAIN RELIEF / NSAIDs ===
  {
    id: "med-1",
    name: "Carprofen (Rimadyl)",
    category: "pain-relief",
    description: "NSAID for pain and inflammation, commonly used for arthritis and post-surgery.",
    activeIngredient: "Carprofen",
    dosage: {
      perKg: 4.4,
      unit: "mg",
      frequency: "once daily",
      minWeightKg: 3,
      maxDose: 100,
      notes: "Give with food. Never combine with other NSAIDs or steroids.",
    },
    warnings: [
      "Do not combine with other NSAIDs or corticosteroids",
      "Watch for vomiting, dark stools, or reduced appetite",
      "Not for pets with kidney or liver disease",
    ],
    requiresPrescription: true,
    forSpecies: ["dog"],
  },
  {
    id: "med-2",
    name: "Meloxicam (Metacam)",
    category: "pain-relief",
    description: "NSAID for pain relief, often used for osteoarthritis.",
    activeIngredient: "Meloxicam",
    dosage: {
      perKg: 0.1,
      unit: "mg",
      frequency: "once daily",
      minWeightKg: 2,
      notes: "Cats: single injection only, not for repeated use. Dogs: can use long-term with monitoring.",
    },
    warnings: [
      "Cats: FDA warns against repeated use",
      "Dogs: monitor kidney and liver function",
      "Never combine with other NSAIDs",
    ],
    requiresPrescription: true,
    forSpecies: ["dog", "cat"],
  },
  {
    id: "med-3",
    name: "Gabapentin",
    category: "pain-relief",
    description: "For nerve pain and as a mild sedative before vet visits.",
    activeIngredient: "Gabapentin",
    dosage: {
      perKg: 10,
      unit: "mg",
      frequency: "every 8-12 hours",
      minWeightKg: 1,
      maxDose: 300,
      notes: "Can cause sedation. Start with lower dose and increase as needed.",
    },
    warnings: [
      "May cause drowsiness and wobbliness",
      "Do not stop abruptly after long-term use",
    ],
    requiresPrescription: true,
    forSpecies: ["dog", "cat"],
  },

  // === FLEA & TICK ===
  {
    id: "med-4",
    name: "Fluralaner (Bravecto)",
    category: "flea-tick",
    description: "Long-acting flea and tick protection, lasts 12 weeks.",
    activeIngredient: "Fluralaner",
    dosage: {
      perKg: 25,
      unit: "mg",
      frequency: "every 12 weeks",
      minWeightKg: 2,
      notes: "Give with food for better absorption. One chew lasts 3 months.",
    },
    warnings: [
      "May cause vomiting in some pets",
      "Use caution in pets with seizure history",
    ],
    requiresPrescription: true,
    forSpecies: ["dog"],
  },
  {
    id: "med-5",
    name: "Selamectin (Revolution)",
    category: "flea-tick",
    description: "Topical flea, tick, and heartworm prevention.",
    activeIngredient: "Selamectin",
    dosage: {
      perKg: 6,
      unit: "mg",
      frequency: "once monthly",
      minWeightKg: 1,
      notes: "Apply to skin at base of neck. Keep pet dry for 2 hours after application.",
    },
    warnings: [
      "For topical use only",
      "Avoid contact with application site until dry",
    ],
    requiresPrescription: true,
    forSpecies: ["dog", "cat"],
  },

  // === ANTIBIOTICS ===
  {
    id: "med-6",
    name: "Enrofloxacin (Baytril)",
    category: "antibiotic",
    description: "Broad-spectrum antibiotic for bacterial infections.",
    activeIngredient: "Enrofloxacin",
    dosage: {
      perKg: 5,
      unit: "mg",
      frequency: "once daily",
      minWeightKg: 1,
      maxDose: 200,
      notes: "Complete the full course even if pet seems better. Avoid giving with dairy or calcium.",
    },
    warnings: [
      "Not for growing puppies (can affect cartilage)",
      "Avoid calcium supplements within 2 hours",
      "Can cause GI upset",
    ],
    requiresPrescription: true,
    forSpecies: ["dog", "cat"],
  },

  // === HEART ===
  {
    id: "med-7",
    name: "Enalapril (Enacard)",
    category: "heart",
    description: "ACE inhibitor for heart disease and high blood pressure.",
    activeIngredient: "Enalapril",
    dosage: {
      perKg: 0.5,
      unit: "mg",
      frequency: "once or twice daily",
      minWeightKg: 2,
      notes: "Monitor kidney function regularly. May take a few weeks to see full effect.",
    },
    warnings: [
      "Monitor kidney values",
      "Can cause low blood pressure",
      "Avoid potassium supplements",
    ],
    requiresPrescription: true,
    forSpecies: ["dog", "cat"],
  },

  // === ANXIETY ===
  {
    id: "med-8",
    name: "Trazodone",
    category: "anxiety",
    description: "For situational anxiety (vet visits, travel, storms).",
    activeIngredient: "Trazodone",
    dosage: {
      perKg: 3,
      unit: "mg",
      frequency: "as needed, up to twice daily",
      minWeightKg: 2,
      maxDose: 200,
      notes: "Give 1-2 hours before stressful event. Can combine with gabapentin under vet guidance.",
    },
    warnings: [
      "May cause sedation",
      "Use caution if pet is on other serotonergic drugs",
    ],
    requiresPrescription: true,
    forSpecies: ["dog"],
  },
  {
    id: "med-9",
    name: "Fluoxetine (Prozac)",
    category: "anxiety",
    description: "For chronic anxiety, separation anxiety, and compulsive behaviors.",
    activeIngredient: "Fluoxetine",
    dosage: {
      perKg: 1,
      unit: "mg",
      frequency: "once daily",
      minWeightKg: 2,
      maxDose: 40,
      notes: "Takes 4-6 weeks for full effect. Do not stop abruptly.",
    },
    warnings: [
      "Do not combine with MAOIs or other serotonergic drugs",
      "Monitor for increased anxiety initially",
      "Requires gradual tapering to discontinue",
    ],
    requiresPrescription: true,
    forSpecies: ["dog", "cat"],
  },

  // === SUPPLEMENTS (OTC) ===
  {
    id: "med-10",
    name: "Glucosamine + Chondroitin",
    category: "supplement",
    description: "Joint supplement for mobility and cartilage support.",
    activeIngredient: "Glucosamine",
    dosage: {
      perKg: 20,
      unit: "mg",
      frequency: "once daily",
      minWeightKg: 2,
      notes: "Loading dose: double for first 4-6 weeks. Takes 6-8 weeks to see results.",
    },
    warnings: [
      "May contain shellfish - avoid if allergic",
      "Generally very safe",
    ],
    requiresPrescription: false,
    forSpecies: ["dog", "cat"],
  },
  {
    id: "med-11",
    name: "Omega-3 Fish Oil",
    category: "supplement",
    description: "For skin/coat health, joint support, and anti-inflammatory effects.",
    activeIngredient: "Omega-3 Fatty Acids",
    dosage: {
      perKg: 75,
      unit: "mg",
      frequency: "once daily (EPA+DHA combined)",
      minWeightKg: 1,
      notes: "Look for products with high EPA/DHA content. Can mix with food.",
    },
    warnings: [
      "High doses may affect blood clotting",
      "Can cause fishy breath or loose stools",
    ],
    requiresPrescription: false,
    forSpecies: ["dog", "cat"],
  },
  {
    id: "med-12",
    name: "Calcium Supplement",
    category: "supplement",
    description: "For pets needing calcium supplementation (nursing mothers, specific conditions).",
    activeIngredient: "Calcium Carbonate",
    dosage: {
      perKg: 50,
      unit: "mg",
      frequency: "with food",
      minWeightKg: 1,
      notes: "Usually not needed for pets on balanced commercial diets. Consult vet first.",
    },
    warnings: [
      "Excess calcium can be harmful, especially in large breed puppies",
      "Can interfere with antibiotic absorption",
      "Can affect thyroid medication absorption",
    ],
    requiresPrescription: false,
    forSpecies: ["dog", "cat"],
  },
];

// Helper functions
export function getMedicationById(id: string): Medication | undefined {
  return medications.find((m) => m.id === id);
}

export function getMedicationsForSpecies(species: "dog" | "cat"): Medication[] {
  return medications.filter(
    (m) => m.forSpecies.includes(species) || m.forSpecies.includes("both")
  );
}

export function getMedicationsByCategory(category: Medication["category"]): Medication[] {
  return medications.filter((m) => m.category === category);
}
