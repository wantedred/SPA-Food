export enum WorldCuisine {
    Traditional,
    Scandinavian,
    Italian,
    Southern,
    Mexican,
    Indian,
    Asian,
    European
}
export interface WorldCuisineName {
    worldCuisine: WorldCuisine;
    name: string;
}
export const worldCuisineNames: WorldCuisineName[] = [
    {worldCuisine: WorldCuisine.Traditional, name: 'Traditional'},
    {worldCuisine: WorldCuisine.Scandinavian, name: 'Scandinavian'},
    {worldCuisine: WorldCuisine.Italian, name: 'Italian'},
    {worldCuisine: WorldCuisine.Southern, name: 'Southern'},
    {worldCuisine: WorldCuisine.Mexican, name: 'Mexican'},
    {worldCuisine: WorldCuisine.Indian, name: 'Indian'},
    {worldCuisine: WorldCuisine.Asian, name: 'Asian'},
    {worldCuisine: WorldCuisine.European, name: 'European'},
];