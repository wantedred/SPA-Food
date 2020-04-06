export enum DietType {
    Diabetic = 0,
    LowCarb = 1,
    LactoseFree = 2,
    GlutenFree = 3,
    LowCalorie = 4,
    HighFiber = 5,
    LowFat = 6,
    LowCholestrol = 7,
    LowSodium = 8
}
export interface DietTypeName {
    dietType: DietType;
    name: string;
}
export const dietTypeNames: DietTypeName[] = [
    {dietType: DietType.Diabetic, name: 'Diabetic'},
    {dietType: DietType.LowCarb, name: 'Low carb'},
    {dietType: DietType.LactoseFree, name: 'Lactose free'},
    {dietType: DietType.GlutenFree, name: 'Gluten free'},
    {dietType: DietType.LowCalorie, name: 'Low calorie'},
    {dietType: DietType.HighFiber, name: 'High fiber'},
    {dietType: DietType.LowFat, name: 'Low fat'},
    {dietType: DietType.LowCholestrol, name: 'Low cholestrol'},
    {dietType: DietType.LowSodium, name: 'Low sodium'},
];