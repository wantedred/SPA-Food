export class EditField {

    public controlName: string;
    public value: any;
    public icon: string = "edit";


    constructor(controlName: string, value: any) {
        this.controlName = controlName;
        this.value = value;
    }

    public toggleEditMode(): void {
        this.icon = this.isInEditMode() ? "edit" : "save";
    }

    public isInEditMode(): boolean {
        return this.icon === "save";
    }

}