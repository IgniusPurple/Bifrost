
import { ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Expense } from "./ExpenseForm";
import { Income } from "./IncomeForm";
import { formatCurrency } from "@/lib/formatters";
import { Progress } from "@/components/ui/progress";

interface FinancialSummaryProps {
  expenses: Expense[];
  incomes: Income[];
}

const FinancialSummary = ({ expenses, incomes }: FinancialSummaryProps) => {
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
  const balance = totalIncome - totalExpenses;
  const spendingPercentage = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;

  return (
    <Card className="p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">Resumo Financeiro</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-800/30 rounded-full flex items-center justify-center mr-2">
              <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-sm text-emerald-700 dark:text-emerald-400">Renda Total</span>
          </div>
          <div className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
            {formatCurrency(totalIncome)}
          </div>
        </div>
        
        <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-rose-100 dark:bg-rose-800/30 rounded-full flex items-center justify-center mr-2">
              <ArrowDownRight className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            </div>
            <span className="text-sm text-rose-700 dark:text-rose-400">Despesas Totais</span>
          </div>
          <div className="text-xl font-bold text-rose-700 dark:text-rose-400">
            {formatCurrency(totalExpenses)}
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800/30 rounded-full flex items-center justify-center mr-2">
              <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm text-blue-700 dark:text-blue-400">Saldo</span>
          </div>
          <div className={`text-xl font-bold ${balance >= 0 ? 'text-blue-700 dark:text-blue-400' : 'text-rose-700 dark:text-rose-400'}`}>
            {formatCurrency(balance)}
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Gastos em relação à renda</span>
          <span>{spendingPercentage.toFixed(0)}%</span>
        </div>
        <Progress value={spendingPercentage > 100 ? 100 : spendingPercentage} className="h-2" />
        <div className="flex justify-between text-xs text-finance-gray mt-1">
          <span>0%</span>
          <span className={`${spendingPercentage > 80 ? 'text-rose-500 font-medium' : ''}`}>
            {spendingPercentage > 100 ? 'Gastos excedem a renda!' : '100%'}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default FinancialSummary;
