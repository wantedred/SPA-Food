export enum DishType {
    Classic = 0,
    Soup = 1,
    Stew = 2,
    Pizza = 3,
    Smoothie = 4,
    Coctail = 5,
    Casserole = 6,
    OvenDish = 7,
    Salad = 8,
        //Subcats
    PastaSalad = 9,
    BreadSalad = 10,
    PotatoSalad = 11,
    EggSalad = 12,
    OtherSalad = 13,
    Sandwiches = 14,
    Subs = 15,
    Panini = 16,
    Croques = 17,
}
export interface DishTypeName {
    dishType: DishType;
    name: string;
}
export const dishTypeNames: DishTypeName[] = [
    {dishType: DishType.Classic, name: 'Classic'},
    {dishType: DishType.Soup, name: 'Soup'},
    {dishType: DishType.Stew, name: 'Stew'},
    {dishType: DishType.Pizza, name: 'Pizza'},
    {dishType: DishType.Smoothie, name: 'Smoothie'},
    {dishType: DishType.Coctail, name: 'Coctail'},
    {dishType: DishType.Casserole, name: 'Casserole'},
    {dishType: DishType.OvenDish, name: 'OvenDish'},
    {dishType: DishType.Salad, name: 'Salad'},
    {dishType: DishType.PastaSalad, name: 'PastaSalad'},
    {dishType: DishType.BreadSalad, name: 'BreadSalad'},
    {dishType: DishType.PotatoSalad, name: 'PotatoSalad'},
    {dishType: DishType.EggSalad, name: 'EggSalad'},
    {dishType: DishType.OtherSalad, name: 'OtherSalad'},
    {dishType: DishType.Sandwiches, name: 'Sandwiches'},
    {dishType: DishType.Subs, name: 'Subs'},
    {dishType: DishType.Panini, name: 'Panini'},
    {dishType: DishType.Croques, name: 'Croques'},
];