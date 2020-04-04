export class Nourishment {

    public name: string;
    public category: string;
    public description: string;
    public thumbnail: string;
    public image: string;


    public Nourishment(name: string) {
        this.name = name;
    }

    public hasMedia(): boolean {
        return this.thumbnail != null && this.image != null;
    }

}