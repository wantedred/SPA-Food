export enum MealType {
    Breakfast = 0,
    Brunch = 1,
    Lunch = 2,
    Appetizer = 3,
    Dinner = 4,
    Dessert = 5,
    Snack = 6,
    Soup = 7
}
export interface MealTypeName {
    mealType: MealType;
    name: string;
}
export const mealTypeNames: MealTypeName[] = [
    {mealType: MealType.Breakfast, name: 'Breakfast'},
    {mealType: MealType.Brunch, name: 'Brunch'},
    {mealType: MealType.Lunch, name: 'Lunch'},
    {mealType: MealType.Appetizer, name: 'Appetizer'},
    {mealType: MealType.Dinner, name: 'Dinner'},
    {mealType: MealType.Dessert, name: 'Dessert'},
    {mealType: MealType.Snack, name: 'Snack'},
    {mealType: MealType.Soup, name: 'Soup'},
];