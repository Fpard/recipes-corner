export type Recipe = {
    id: number;
    authorName: string;
    name: string;
    type: string;
    ingredients: {
        ingredient: string ;
    }[]
    comments: {
        user: string;
        comment: string ;
    }[]
};

export type NewRecipe = Omit<Recipe, "id">;

export type Ingredient = {
    ingredient: string ;
}
export type Comment = {
    comment: string ;
}
