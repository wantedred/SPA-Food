export enum Sex {
  Male = 0,
  Female = 1
}
export interface SexName {
    sex: Sex;
    name: string;
}
export const sexNames: SexName[] = [
    {sex: Sex.Male, name: 'Male'},
    {sex: Sex.Female, name: 'Female'}
];