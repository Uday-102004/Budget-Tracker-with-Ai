import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Transaction } from '@/pages/Dashboard';

interface AddTransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Business',
  'Investment',
  'Gift',
  'Other Income'
];

const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Other Expense'
];

export const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ onAddTransaction }) => {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category || !date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    onAddTransaction({
      type,
      amount: numAmount,
      category,
      date,
      description: description.trim() || undefined,
    });

    toast({
      title: "Transaction added!",
      description: `${type === 'income' ? 'Income' : 'Expense'} of $${numAmount.toFixed(2)} has been recorded.`,
    });

    // Reset form
    setAmount('');
    setCategory('');
    setDescription('');
  };

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Transaction Type */}
        <div className="space-y-2">
          <Label>Transaction Type</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={type === 'income' ? 'default' : 'outline'}
              onClick={() => {
                setType('income');
                setCategory('');
              }}
              className={type === 'income' ? 'bg-success hover:bg-success/90' : ''}
            >
              Income
            </Button>
            <Button
              type="button"
              variant={type === 'expense' ? 'default' : 'outline'}
              onClick={() => {
                setType('expense');
                setCategory('');
              }}
              className={type === 'expense' ? 'bg-destructive hover:bg-destructive/90' : ''}
            >
              Expense
            </Button>
          </div>
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount">Amount *</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Category *</Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          placeholder="Add a note about this transaction..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full">
        Add {type === 'income' ? 'Income' : 'Expense'}
      </Button>
    </form>
  );
};