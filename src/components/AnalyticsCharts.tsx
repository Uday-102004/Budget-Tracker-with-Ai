import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@/pages/Dashboard';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

interface AnalyticsChartsProps {
  transactions: Transaction[];
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ transactions }) => {
  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Monthly data preparation
  const getMonthlyData = () => {
    const monthlyData: { [key: string]: { month: string; income: number; expenses: number; net: number } } = {};
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { month: monthName, income: 0, expenses: 0, net: 0 };
      }
      
      if (transaction.type === 'income') {
        monthlyData[monthKey].income += transaction.amount;
      } else {
        monthlyData[monthKey].expenses += transaction.amount;
      }
      monthlyData[monthKey].net = monthlyData[monthKey].income - monthlyData[monthKey].expenses;
    });
    
    return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
  };

  // Category data preparation
  const getCategoryData = () => {
    const categoryData: { [key: string]: { category: string; income: number; expenses: number; total: number } } = {};
    
    transactions.forEach(transaction => {
      if (!categoryData[transaction.category]) {
        categoryData[transaction.category] = { 
          category: transaction.category, 
          income: 0, 
          expenses: 0, 
          total: 0 
        };
      }
      
      if (transaction.type === 'income') {
        categoryData[transaction.category].income += transaction.amount;
      } else {
        categoryData[transaction.category].expenses += transaction.amount;
      }
      categoryData[transaction.category].total = categoryData[transaction.category].income + categoryData[transaction.category].expenses;
    });
    
    return Object.values(categoryData).sort((a, b) => b.total - a.total);
  };

  // Expense distribution for pie chart
  const getExpenseDistribution = () => {
    const expenseData: { [key: string]: number } = {};
    
    transactions
      .filter(t => t.type === 'expense')
      .forEach(transaction => {
        expenseData[transaction.category] = (expenseData[transaction.category] || 0) + transaction.amount;
      });
    
    return Object.entries(expenseData)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  };

  const monthlyData = getMonthlyData();
  const categoryData = getCategoryData();
  const expenseDistribution = getExpenseDistribution();

  // Colors for charts
  const COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--success))',
    'hsl(var(--destructive))',
    'hsl(var(--accent))',
    'hsl(var(--warning))',
    'hsl(var(--info))',
    'hsl(var(--muted))',
    'hsl(var(--border))'
  ];

  if (transactions.length === 0) {
    return (
      <div className="grid gap-6">
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">No transaction data available for analytics</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={formatCurrency}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), '']}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                name="Income"
                dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                name="Expenses"
                dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="net" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Net"
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category vs Amount */}
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="category" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={formatCurrency}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), '']}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="income" 
                fill="hsl(var(--success))" 
                name="Income"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="expenses" 
                fill="hsl(var(--destructive))" 
                name="Expenses"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Expense Distribution Pie Chart */}
      {expenseDistribution.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Expense Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {expenseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Amount']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};