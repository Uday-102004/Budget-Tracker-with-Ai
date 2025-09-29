# Budget Tracker Web Application

A modern, responsive budget tracking application built with React, TypeScript, and Tailwind CSS. Track your income and expenses with beautiful visualizations and detailed analytics.

## ✨ Features

### 🏠 Landing Page
- Clean, modern design with call-to-action buttons
- Login and Register options
- Responsive layout

### 🔐 Authentication
- User registration with form validation
- Secure login system
- Persistent user sessions

### 📊 Dashboard
- **Add Transactions**: Record income and expenses with categories and dates
- **Transaction History**: View all transactions in a searchable, sortable table
- **Analytics Charts**: 
  - Monthly spending trends
  - Category-wise expense breakdown
  - Income vs Expense comparison
- **Financial Stats**: Quick overview of total income, expenses, and balance

### 📈 Visual Analytics
- Interactive charts using Recharts library
- Month-wise financial trends
- Category-based spending analysis
- Responsive chart design

## 🛠️ Technologies Used

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Charts**: Recharts for data visualization
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Data Persistence**: LocalStorage (client-side)
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd budget-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📱 How to Use

1. **Register**: Create a new account with your name, email, and password
2. **Login**: Access your dashboard with your credentials
3. **Add Transactions**: 
   - Switch to "Add Transaction" tab
   - Select income or expense
   - Enter amount, category, and date
   - Add optional description
4. **View History**: Check all your transactions in the "Transaction History" tab
5. **Analyze Data**: View charts and trends in the "Analytics" tab

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── AddTransactionForm.tsx
│   ├── AnalyticsCharts.tsx
│   ├── DashboardStats.tsx
│   └── TransactionList.tsx
├── contexts/            # React contexts
│   └── AuthContext.tsx
├── pages/               # Route components
│   ├── Dashboard.tsx
│   ├── Index.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   └── NotFound.tsx
├── lib/                 # Utility functions
│   └── utils.ts
└── App.tsx              # Main app component
```

## 🎨 Design System

The application uses a carefully crafted design system with:
- **Primary Colors**: Deep teal/blue for financial trust
- **Success Colors**: Green for income indicators
- **Destructive Colors**: Warm red for expenses
- **Gradients**: Subtle background gradients
- **Typography**: Clean, readable font hierarchy
- **Components**: Consistent spacing and styling

## 📊 Data Storage

Currently uses browser's localStorage for data persistence. Each user's data is stored separately using their user ID as a key.

## 🔮 Future Enhancements

- Backend integration with real database
- Export data to CSV/PDF
- Budget planning and alerts
- Multi-currency support
- Recurring transactions
- Mobile app version

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Deployment

This project is built with Lovable and can be easily deployed:

1. Visit your [Lovable Project](https://lovable.dev/projects/8bf4ed5a-a175-4b9d-8f1c-0b801947cb80)
2. Click on Share → Publish
3. Your app will be live with a custom URL

## 💡 Support

If you have any questions or need help, feel free to open an issue or contact the development team.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS