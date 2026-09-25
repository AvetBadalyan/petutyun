import type { Pet } from "@/store/pets";
import type { Medication } from "@/data/medications";

/**
 * Dosage Calculator
 * 
 * Calculates weight-based medication dosage for a pet.
 * This is the "real logic" that makes the app technically interesting.
 * 
 * How it works:
 * 1. Each medication has a dosage rule (mg per kg of body weight)
 * 2. We multiply the pet's weight by the per-kg dose
 * 3. We apply min/max limits and round sensibly
 * 4. We check if the pet meets minimum weight requirements
 * 
 * IMPORTANT: This is for DEMO PURPOSES ONLY - always consult a vet!
 */

export interface DosageResult {
  // Is this medication appropriate for the pet?
  eligible: boolean;
  // Why not eligible (if applicable)
  reason?: string;
  // Calculated dose amount
  amount: number;
  // Unit (mg, mL, tablet, etc.)
  unit: string;
  // How often to give
  frequency: string;
  // Human-readable display string
  display: string;
  // Additional notes
  notes?: string;
}

export function calculateDosage(medication: Medication, pet: Pet): DosageResult {
  const { dosage } = medication;
  const { weight } = pet;

  // Check minimum weight requirement
  if (weight < dosage.minWeightKg) {
    return {
      eligible: false,
      reason: `${medication.name} is approved for pets over ${dosage.minWeightKg} kg. ${pet.name} is ${weight} kg.`,
      amount: 0,
      unit: dosage.unit,
      frequency: dosage.frequency,
      display: "Not recommended at this weight",
      notes: dosage.notes,
    };
  }

  // Calculate base dose: weight × per-kg dose
  let amount = dosage.perKg * weight;

  // Round based on unit type
  if (dosage.unit === "tablet") {
    // Round to nearest half tablet (0.5)
    amount = Math.max(0.5, Math.round(amount * 2) / 2);
  } else if (dosage.unit === "mL") {
    // Round to one decimal place
    amount = Math.round(amount * 10) / 10;
  } else {
    // mg, IU - round to whole number
    amount = Math.round(amount);
  }

  // Apply maximum dose ceiling if specified
  if (dosage.maxDose && amount > dosage.maxDose) {
    amount = dosage.maxDose;
  }

  // Build display string
  const unitLabel =
    dosage.unit === "tablet"
      ? amount === 1
        ? "tablet"
        : "tablets"
      : dosage.unit;

  return {
    eligible: true,
    amount,
    unit: dosage.unit,
    frequency: dosage.frequency,
    display: `${amount} ${unitLabel}, ${dosage.frequency}`,
    notes: dosage.notes,
  };
}

/**
 * Calculate dosage for multiple medications at once
 */
export function calculateAllDosages(
  medications: Medication[],
  pet: Pet
): Map<string, DosageResult> {
  const results = new Map<string, DosageResult>();
  
  for (const med of medications) {
    results.set(med.id, calculateDosage(med, pet));
  }
  
  return results;
}
