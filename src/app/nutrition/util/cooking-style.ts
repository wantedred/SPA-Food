export enum CookingStyle {
    GrillBBQ = 0,
    Budget = 1,
    CleanEating = 2,
    Gourmet = 3,
    Paleo = 4,
    PressureCooker = 5,
    QuickEasy = 6,
    SlowCooker = 7,
    Vegan = 8,
    Vegetarian = 9
}
export interface CookingStyleName {
    cookingStyle: CookingStyle;
    name: string;
}
export const cookingStyleNames: CookingStyleName[] = [
    {cookingStyle: CookingStyle.GrillBBQ, name: 'Grill & BBQ'},
    {cookingStyle: CookingStyle.Budget, name: 'Budget'},
    {cookingStyle: CookingStyle.CleanEating, name: 'Clean Eating'},
    {cookingStyle: CookingStyle.Gourmet, name: 'Gourmet'},
    {cookingStyle: CookingStyle.Paleo, name: 'Paleo'},
    {cookingStyle: CookingStyle.PressureCooker, name: 'Pressure Cooker'},
    {cookingStyle: CookingStyle.QuickEasy, name: 'Quick & Easy'},
    {cookingStyle: CookingStyle.SlowCooker, name: 'Slow Cooker'},
    {cookingStyle: CookingStyle.Vegan, name: 'Vegan'},
    {cookingStyle: CookingStyle.Vegetarian, name: 'Vegetarian'},
];