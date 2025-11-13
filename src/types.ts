export type Recipe = {
    id: number;
    name: string;
    type: string;
    ingredients: Array<string>;
    comments?: Array<string>
};

export type NewRecipe = Omit<Recipe, "id">;