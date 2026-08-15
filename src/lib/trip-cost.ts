import { roundTo } from "./convert";

export type TripCostInput = {
  distanceKm: number;
  fuelEfficiencyKmPerL: number;
  fuelPricePerL: number;
  tollFee: number;
  boatFee: number;
  otherFee: number;
  peopleCount: number;
};

export type TripCostResult = {
  fuelCost: number;
  totalCost: number;
  perPersonCost: number;
};

export function calcTripCost(input: TripCostInput): TripCostResult {
  const {
    distanceKm,
    fuelEfficiencyKmPerL,
    fuelPricePerL,
    tollFee,
    boatFee,
    otherFee,
    peopleCount,
  } = input;

  const fuelCost =
    fuelEfficiencyKmPerL > 0
      ? (distanceKm / fuelEfficiencyKmPerL) * fuelPricePerL
      : 0;

  const totalCost = fuelCost + tollFee + boatFee + otherFee;
  const people = Math.max(1, peopleCount);
  const perPersonCost = totalCost / people;

  return {
    fuelCost: roundTo(fuelCost, 0),
    totalCost: roundTo(totalCost, 0),
    perPersonCost: roundTo(perPersonCost, 0),
  };
}
