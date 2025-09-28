import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { AddTransactionForm } from '@/components/AddTransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { DashboardStats } from '@/components/DashboardStats';
import { LogOut, PlusCircle, List, BarChart3 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  description?: string;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    // Load transactions from localStorage
    const savedTransactions = localStorage.getItem(`budget_tracker_transactions_${user.id}`);
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, [user.id]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem(`budget_tracker_transactions_${user.id}`, JSON.stringify(updatedTransactions));
  };

  const deleteTransaction = (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    localStorage.setItem(`budget_tracker_transactions_${user.id}`, JSON.stringify(updatedTransactions));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/10">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">Budget Tracker</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {user.name}!</p>
          </div>
          <Button onClick={logout} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <DashboardStats transactions={transactions} />

        {/* Tabs for different sections */}
        <Tabs defaultValue="add" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="add" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Transaction
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Transaction History
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Transaction</CardTitle>
                <CardDescription>
                  Record your income or expenses to keep track of your budget
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AddTransactionForm onAddTransaction={addTransaction} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="mt-6">
            <TransactionList 
              transactions={transactions} 
              onDeleteTransaction={deleteTransaction}
            />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Visualize your spending patterns and financial trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Analytics charts will be implemented here with spending by category and monthly trends.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;