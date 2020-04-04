export class Base64 {

    
    public static encode(file: File): string {
        if (file == null) {
            console.error("Nulled file passed to base64 encoder");
            return null;
        }
        let fr: FileReader = new FileReader();
        fr.onloadend = () => {
            let base64: string = fr.result.toString().split('base64,')[1];
            return base64;
        }
        fr.readAsDataURL(file);
        return null;
    }

}