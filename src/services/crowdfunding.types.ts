export interface CrowdfundingProject {
  id: number;
  name: string;
  goal: number;   // objectif en USD
  raised: number; // montant collecté en USD
}
