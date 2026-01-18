export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: Ingredient[];
  usedIngredients: Ingredient[];
  unusedIngredients: Ingredient[];
  likes: number;
}

export interface Ingredient {
  id: number;
  amount: number;
  unit: string;
  unitLong: string;
  unitShort: string;
  aisle: string;
  name: string;
  original: string;
  originalName: string;
  meta: string[];
  image: string;
}

export interface RecipeDetail {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  sourceName: string;
  sourceUrl: string;
  spoonacularScore: number;
  healthScore: number;
  pricePerServing: number;
  cheap: boolean;
  creditsText: string;
  dairyFree: boolean;
  gaps: string;
  glutenFree: boolean;
  instructions: string;
  ketogenic: boolean;
  lowFodmap: boolean;
  sustainable: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  whole30: boolean;
  weightWatcherSmartPoints: number;
  dishTypes: string[];
  extendedIngredients: ExtendedIngredient[];
  summary: string;
  cuisines: string[];
  diets: string[];
  occasions: string[];
  analyzedInstructions: AnalyzedInstruction[];
}

export interface ExtendedIngredient {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: {
    us: Measure;
    metric: Measure;
  };
}

export interface Measure {
  amount: number;
  unitShort: string;
  unitLong: string;
}

export interface AnalyzedInstruction {
  name: string;
  steps: InstructionStep[];
}

export interface InstructionStep {
  number: number;
  step: string;
  ingredients: StepIngredient[];
  equipment: StepEquipment[];
  length?: {
    number: number;
    unit: string;
  };
}

export interface StepIngredient {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface StepEquipment {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface SearchFilters {
  maxMissingIngredients: number;
  sortBy: 'relevance' | 'missedIngredients' | 'likes';
}
