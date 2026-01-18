# 🍳 Receepee - Smart Recipe Finder

Receepee is a modern, intuitive recipe finder application that helps you discover delicious meals based on the ingredients you already have in your kitchen.

![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38bdf8?logo=tailwindcss)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.x-ff4154)

## ✨ Features

- **🔍 Ingredient-Based Search**: Enter the ingredients you have, and find recipes that match
- **📊 Smart Filtering**: Filter recipes by missing ingredients count and sort by relevance or popularity
- **🖼️ E-commerce Style UI**: Interactive image gallery that changes based on selected items/ingredients
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **⚡ Fast & Efficient**: Built with TanStack Query for optimized API calls with caching
- **🎨 Beautiful UI**: Modern design with smooth animations and intuitive interactions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Spoonacular API key (free tier available)

### Installation

1. Clone the repository:
```bash
cd Receepee
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your Spoonacular API key to `.env`:
```
VITE_SPOONACULAR_API_KEY=your_api_key_here
```

> 📝 Get your free API key at [Spoonacular Food API](https://spoonacular.com/food-api)

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🛠️ Tech Stack

- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack Query v5** - Powerful data fetching and caching
- **Vite** - Next-generation frontend tooling
- **Spoonacular API** - Comprehensive food and recipe database

## 📁 Project Structure

```
src/
├── api/              # API client and configuration
│   └── spoonacular.ts
├── components/       # React components
│   ├── Header.tsx
│   ├── IngredientInput.tsx
│   ├── FilterPanel.tsx
│   ├── RecipeCard.tsx
│   ├── RecipeGrid.tsx
│   ├── RecipeDetail.tsx
│   ├── LoadingSpinner.tsx
│   ├── ErrorMessage.tsx
│   └── EmptyState.tsx
├── hooks/            # Custom React hooks
│   └── useRecipes.ts
├── types/            # TypeScript type definitions
│   └── recipe.ts
├── utils/            # Utility functions
│   └── helpers.ts
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
└── index.css         # Global styles with Tailwind
```

## 🎯 Key Features Explained

### Ingredient Search
Type ingredients you have (e.g., "chicken", "rice", "garlic") and the app will find recipes you can make. Quick-add buttons make it easy to add common ingredients.

### Smart Filtering
- **Max Missing Ingredients**: Control how many extra ingredients you're willing to buy
- **Sort Options**: Sort by relevance, fewest missing ingredients, or popularity

### E-commerce Style Image Gallery
Similar to product pages on e-commerce sites, clicking on different items updates the main image. In the recipe detail view, click on ingredient thumbnails to see their images.

### API Response Handling
- **Caching**: Recipes are cached to reduce API calls
- **Loading States**: Beautiful loading spinners while fetching data
- **Error Handling**: Friendly error messages with retry options
- **Data Filtering**: Client-side filtering for missing ingredients

## 📝 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🔑 API Configuration

The app uses the [Spoonacular API](https://spoonacular.com/food-api). The free tier includes:
- 150 requests per day
- Access to recipe search, details, and more

Set your API key in the `.env` file:
```
VITE_SPOONACULAR_API_KEY=your_api_key_here
```

## 🎨 UI/UX Highlights

- **Gradient Headers**: Eye-catching orange gradient theme
- **Card Animations**: Smooth hover effects and transitions
- **Match Indicators**: Color-coded badges showing ingredient match percentage
- **Responsive Grid**: Adapts from 1 to 4 columns based on screen size
- **Modal Details**: Full recipe details in a beautiful overlay modal

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Spoonacular](https://spoonacular.com/) for their comprehensive food API
- [Tailwind CSS](https://tailwindcss.com/) for the amazing utility-first CSS framework
- [TanStack Query](https://tanstack.com/query) for powerful data fetching

---

Made with ❤️ and 🍳 by the Receepee team
