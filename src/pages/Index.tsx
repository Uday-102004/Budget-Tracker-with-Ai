import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PiggyBank, TrendingUp, Shield, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <PiggyBank className="mx-auto h-16 w-16 text-primary mb-6" />
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Budget Tracker
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Take control of your finances with our simple and intuitive budget tracking application. 
              Monitor your income, track expenses, and achieve your financial goals.
            </p>
          </div>
          
          <div className="flex gap-4 justify-center mb-16">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="mx-auto h-12 w-12 text-success mb-4" />
              <CardTitle className="text-lg">Track Income</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Record and categorize all your income sources to get a complete financial picture.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <PiggyBank className="mx-auto h-12 w-12 text-destructive mb-4" />
              <CardTitle className="text-lg">Monitor Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Keep tabs on your spending habits and identify areas where you can save money.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="mx-auto h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-lg">Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your financial data is stored securely and privately. Only you have access to your information.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Zap className="mx-auto h-12 w-12 text-accent-foreground mb-4" />
              <CardTitle className="text-lg">Easy to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Simple and intuitive interface designed for users of all experience levels.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Budget Tracker. Built with modern web technologies for your financial success.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
