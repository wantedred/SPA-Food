export enum NourishmentType {
    //Bases
    Bread = 0,
    Taco = 1,
    Pasta = 2,
    Potatoes = 3,
    Rice = 4,
    Noodles = 5,
    Maniok = 6,

    //Side
    Fruit = 7,
    Vegetables = 8,
    BeansLegumes = 9,
    Mushrooms = 10,

    //Protein
    SeaFood = 11,
        //Subcats
    Fish = 12,
    Shellfish = 13,

    Eggs = 14,

    WhiteMeat = 15,
        //Subcats
    Chicken = 16,
    Turkey = 17,
    Rabbit = 18,
    Veal = 19,
    OtherWhiteMeat = 20,

    RedMeat = 21,
        //Subcats
    Beef = 22,
    Mutton = 23,
    Venison = 24,
    Horse = 25,
    Duck = 26,
    Geese = 27,
    Pork = 28,
    Wild = 29,

    Baking = 30,
        //Subcats
    Cookie = 31,
    Pie = 32,
    Cake = 33,
    OtherBaking = 34, //pancakes, waffels, ...

    Candy = 35,

    SaucesCondiments = 36,

    Tofu = 37,

    Appetizer = 38,
    Snack = 39,
    Dessert = 40,
    Soup = 41
}
export interface NourishmentTypeName {
    nourishmentType: NourishmentType;
    name: string;
}
export const nourishmentTypeNames: NourishmentTypeName[] = [
    //Bases
    {nourishmentType: NourishmentType.Bread, name: 'Bread'},
    {nourishmentType: NourishmentType.Taco, name: 'Taco'},
    {nourishmentType: NourishmentType.Pasta, name: 'Pasta'},
    {nourishmentType: NourishmentType.Potatoes, name: 'Potatoes'},
    {nourishmentType: NourishmentType.Rice, name: 'Rice'},
    {nourishmentType: NourishmentType.Noodles, name: 'Noodles'},
    {nourishmentType: NourishmentType.Maniok, name: 'Maniok'},
    //Side
    {nourishmentType: NourishmentType.Fruit, name: 'Fruit'},
    {nourishmentType: NourishmentType.Vegetables, name: 'Vegetables'},
    {nourishmentType: NourishmentType.BeansLegumes, name: 'Beans & Legumes'},
    {nourishmentType: NourishmentType.Mushrooms, name: 'Mushrooms'},
    //Protein
    {nourishmentType: NourishmentType.SeaFood, name: 'Sea food'},
    {nourishmentType: NourishmentType.Fish, name: 'Fish'},
    {nourishmentType: NourishmentType.Shellfish, name: 'Shellfish'},
    {nourishmentType: NourishmentType.Eggs, name: 'Eggs'},
    {nourishmentType: NourishmentType.WhiteMeat, name: 'White meat'},
    {nourishmentType: NourishmentType.Chicken, name: 'Chicken'},
    {nourishmentType: NourishmentType.Turkey, name: 'Turkey'},
    {nourishmentType: NourishmentType.Rabbit, name: 'Rabbit'},
    {nourishmentType: NourishmentType.Veal, name: 'Veal'},
    {nourishmentType: NourishmentType.OtherWhiteMeat, name: 'OtherWhiteMeat'},
    {nourishmentType: NourishmentType.RedMeat, name: 'Red meat'},
    {nourishmentType: NourishmentType.Beef, name: 'Beef'},
    {nourishmentType: NourishmentType.Mutton, name: 'Mutton'},
    {nourishmentType: NourishmentType.Venison, name: 'Venison'},
    {nourishmentType: NourishmentType.Horse, name: 'Horse'},
    {nourishmentType: NourishmentType.Duck, name: 'Duck'},
    {nourishmentType: NourishmentType.Geese, name: 'Geese'},
    {nourishmentType: NourishmentType.Pork, name: 'Pork'},
    {nourishmentType: NourishmentType.Wild, name: 'Wild'},
    {nourishmentType: NourishmentType.Baking, name: 'Baking'},
    {nourishmentType: NourishmentType.Cookie, name: 'Cookie'},
    {nourishmentType: NourishmentType.Pie, name: 'Pie'},
    {nourishmentType: NourishmentType.Cake, name: 'Cake'},
    {nourishmentType: NourishmentType.OtherBaking, name: 'OtherBaking'},
    {nourishmentType: NourishmentType.Candy, name: 'Candy'},
    {nourishmentType: NourishmentType.SaucesCondiments, name: 'SaucesCondiments'},
    {nourishmentType: NourishmentType.Tofu, name: 'Tofu'},
    {nourishmentType: NourishmentType.Appetizer, name: 'Appetizer'},
    {nourishmentType: NourishmentType.Snack, name: 'Snack'},
    {nourishmentType: NourishmentType.Dessert, name: 'Dessert'},
    {nourishmentType: NourishmentType.Soup, name: 'Soup'},
];