export class Constants {

    //Base urls
    public static serverUrl:string = "https://localhost:44329/api/";
    public static usersUrl:string = Constants.serverUrl + "Users";
    public static authUrl:string = Constants.serverUrl + "Auth"

    //Endpoints
    public static loginUrl:string = Constants.authUrl + "/login";
    public static registerUrl:string = Constants.authUrl + "/register";
    public static logoutUrl:string = Constants.authUrl + "/logout";

}