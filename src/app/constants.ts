export class Constants {

    //Base urls
    public static serverUrl: string = "https://localhost:44329/api/";
    public static usersUrl: string = Constants.serverUrl + "Users";
    public static accountUrl: string = Constants.serverUrl + "Account";
    public static authUrl: string = Constants.serverUrl + "Auth"
    public static nourishmentsUrl: string = Constants.serverUrl + "Nourishments"

    //Auth endpoints
    public static loginUrl: string = Constants.authUrl + "/login";
    public static registerUrl: string = Constants.authUrl + "/register";
    public static logoutUrl: string = Constants.authUrl + "/logout";
    public static deleteAccountUrl: string = Constants.authUrl + "/delete";
    public static refreshJwtUrl: string = Constants.authUrl + "/refresh";
    public static authFetchUrl: string = Constants.authUrl + "/fetch";
    public static apiVersionFetchUrl: string = Constants.authUrl + "/version";

    //Account endpoints
    public static validateEmailAddressUrl: string = Constants.accountUrl + "/validate/email";
    public static accountFetchUrl: string = Constants.accountUrl + "/fetch";
    public static updatePasswordUrl: string = Constants.accountUrl + "/password/update";
    public static changePasswordUrl: string = Constants.accountUrl + "/password/change";
    public static resetPasswordRequestUrl: string = Constants.accountUrl + "/recovery/request";
    public static resetPasswordValidateUrl: string = Constants.accountUrl + "/recovery/validate";

    //Nourishment endpoints
    public static searchNourishmentUrl: string = Constants.nourishmentsUrl + "/search";
    public static nourishmentDetailsUrl: string = Constants.nourishmentsUrl + "/details";
    public static nourishmentSubmitUrl: string = Constants.nourishmentsUrl + "/submit";

}