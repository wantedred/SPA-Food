import { DishType } from 'src/app/recipes/dish-type';

export class Nourishment {

    public name: string;
    public dishType: DishType;
    public description: string;
    public thumbnail: string;
    public image: string;


    public hasMedia(): boolean {
        return this.thumbnail != null && this.image != null;
    }

}