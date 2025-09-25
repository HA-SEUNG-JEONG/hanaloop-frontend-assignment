import { Company, GhgEmission, Subsidiary } from "../../types";

export function calculateEmissionChange(emissions: GhgEmission[]): number {
  if (emissions.length < 2) return 0;

  const latest = emissions[emissions.length - 1];
  const previous = emissions[emissions.length - 2];

  return ((latest.emissions - previous.emissions) / previous.emissions) * 100;
}

export function calculateTotalEmployees(company: Company): number {
  return (
    company.employeeCount +
    company.subsidiaries.reduce((sum, sub) => sum + sub.employeeCount, 0)
  );
}

export function calculateTotalSubsidiaryEmissions(company: Company): number {
  return company.subsidiaries.reduce((sum, sub) => {
    const latest = sub.emissions[sub.emissions.length - 1];
    return sum + (latest?.emissions || 0);
  }, 0);
}

export function calculateTotalCompanyEmissions(company: Company): number {
  const latestEmission = company.emissions[company.emissions.length - 1];
  const subsidiaryEmissions = calculateTotalSubsidiaryEmissions(company);

  return (latestEmission?.emissions || 0) + subsidiaryEmissions;
}

export function calculateAverageOwnership(company: Company): number {
  if (company.subsidiaries.length === 0) return 0;

  const totalOwnership = company.subsidiaries.reduce(
    (sum, sub) => sum + sub.ownershipPercentage,
    0
  );

  return totalOwnership / company.subsidiaries.length;
}

export function sortCompaniesByEmissions<T extends { latestEmissions: number }>(
  companies: T[]
): T[] {
  return [...companies].sort((a, b) => b.latestEmissions - a.latestEmissions);
}

export function sortSubsidiariesByOwnership(
  subsidiaries: Subsidiary[]
): Subsidiary[] {
  return [...subsidiaries].sort(
    (a, b) => b.ownershipPercentage - a.ownershipPercentage
  );
}
