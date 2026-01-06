import { initialExpenses } from '../mocks/expenses';
import type { ExpenseItem } from './expense.types';
import { logAudit } from './audit/audit.service';

export function getExpenses(): ExpenseItem[] {
  return initialExpenses;
}

export function analyzeExpenses(expenses: ExpenseItem[]) {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  const average = expenses.length ? total / expenses.length : 0;

  logAudit('EXPENSE_ANALYSIS', { total, average });
  
  return { total, average };
}
