import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react';
import { Transaction } from '@/pages/Dashboard';

interface DashboardStatsProps {
  transactions: Transaction[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ transactions }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Current month transactions
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const currentMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === currentMonth && 
           transactionDate.getFullYear() === currentYear;
  });

  const monthlyIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const currentMonthName = new Date().toLocaleDateString('en-US', { month: 'long' });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Balance */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <Wallet className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent className="relative">
          <div className={`text-2xl font-bold ${
            balance >= 0 ? 'text-success' : 'text-destructive'
          }`}>
            {formatCurrency(balance)}
          </div>
          <p className="text-xs text-muted-foreground">
            {balance >= 0 ? 'You\'re in the green!' : 'You\'re overspending'}
          </p>
        </CardContent>
      </Card>

      {/* Total Income */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-success/10 to-success/5" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent className="relative">
          <div className="text-2xl font-bold text-success">
            {formatCurrency(totalIncome)}
          </div>
          <p className="text-xs text-muted-foreground">
            All time earnings
          </p>
        </CardContent>
      </Card>

      {/* Total Expenses */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 to-destructive/5" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent className="relative">
          <div className="text-2xl font-bold text-destructive">
            {formatCurrency(totalExpenses)}
          </div>
          <p className="text-xs text-muted-foreground">
            All time spending
          </p>
        </CardContent>
      </Card>

      {/* This Month */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/10" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
          <CardTitle className="text-sm font-medium">{currentMonthName}</CardTitle>
          <PiggyBank className="h-4 w-4 text-accent-foreground" />
        </CardHeader>
        <CardContent className="relative">
          <div className={`text-2xl font-bold ${
            monthlyIncome - monthlyExpenses >= 0 ? 'text-success' : 'text-destructive'
          }`}>
            {formatCurrency(monthlyIncome - monthlyExpenses)}
          </div>
          <p className="text-xs text-muted-foreground">
            {formatCurrency(monthlyIncome)} in, {formatCurrency(monthlyExpenses)} out
          </p>
        </CardContent>
      </Card>
    </div>
  );
};