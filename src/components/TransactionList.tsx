import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Trash2, Search, Calendar, DollarSign } from 'lucide-react';
import { Transaction } from '@/pages/Dashboard';
import { useToast } from '@/hooks/use-toast';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  onDeleteTransaction 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleDelete = (id: string, type: string, amount: number) => {
    onDeleteTransaction(id);
    toast({
      title: "Transaction deleted",
      description: `${type === 'income' ? 'Income' : 'Expense'} of $${amount.toFixed(2)} has been removed.`,
    });
  };

  const filteredTransactions = transactions.filter(transaction => 
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.amount.toString().includes(searchTerm)
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Your recent income and expenses will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <DollarSign className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No transactions yet. Start by adding your first income or expense!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>
          {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} recorded
        </CardDescription>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  transaction.type === 'income' ? 'bg-success' : 'bg-destructive'
                }`} />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{transaction.category}</h4>
                    <Badge variant={transaction.type === 'income' ? 'default' : 'destructive'}>
                      {transaction.type}
                    </Badge>
                  </div>
                  
                  {transaction.description && (
                    <p className="text-sm text-muted-foreground mb-1">
                      {transaction.description}
                    </p>
                  )}
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {formatDate(transaction.date)}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`font-semibold text-lg ${
                  transaction.type === 'income' ? 'text-success' : 'text-destructive'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </span>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(transaction.id, transaction.type, transaction.amount)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {filteredTransactions.length === 0 && searchTerm && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No transactions match your search.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};