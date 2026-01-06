import { projects } from '@/mocks/crowdfunding';
import type { CrowdfundingProject } from './crowdfunding.types';
import { logAudit } from './audit/audit.service';

export function getAllProjects(): CrowdfundingProject[] {
  return projects;
}

export function invest(projectId: number, amount: number): CrowdfundingProject | null {
  const project = projects.find(p => p.id === projectId);
  if (!project) return null;

  project.raised += amount;

  logAudit('CROWDFUNDING_INVEST', { projectId, amount, newRaised: project.raised });
  return project;
}
