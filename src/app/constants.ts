export class Constants {

    //Base urls
    public static serverUrl: string = "https://localhost:44329/api/";
    public static usersUrl: string = Constants.serverUrl + "Users";
    public static accountUrl: string = Constants.serverUrl + "Account";
    public static authUrl: string = Constants.serverUrl + "Auth"
    public static nourishmentsUrl: string = Constants.serverUrl + "Nourishments"
    public static inventoryUrl: string = Constants.serverUrl + "Inventory";
    public static dishUrl: string = Constants.serverUrl + "Dish";

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
    public static confirmEmailAddressUrl: string = Constants.accountUrl + "/email/confirm";
    public static changeEmailAddressUrl: string = Constants.accountUrl + "/email/change";
    public static requestEmailConfirmationLinkUrl: string = Constants.accountUrl + "/email/request";
    public static accountFetchUrl: string = Constants.accountUrl + "/fetch";
    public static updatePasswordUrl: string = Constants.accountUrl + "/password/update";
    public static changePasswordUrl: string = Constants.accountUrl + "/password/change";
    public static resetPasswordRequestUrl: string = Constants.accountUrl + "/recovery/request";
    public static resetPasswordValidateUrl: string = Constants.accountUrl + "/recovery/validate";
    public static fetchNotifsUrl: string = Constants.accountUrl + "/notifs";
    public static changeAccDetails: string = Constants.accountUrl + "/details/change";
    public static fetchRoles: string = Constants.accountUrl + "/roles";

    //Nourishment endpoints
    public static searchNourishmentUrl: string = Constants.nourishmentsUrl + "/search";
    public static nourishmentDetailsUrl: string = Constants.nourishmentsUrl + "/details";
    public static nourishmentSubmitUrl: string = Constants.nourishmentsUrl + "/submit";

    //Inventory endpoints
    public static inventoryClearUrl: string = Constants.inventoryUrl + "/clear";
    public static inventoryAddUrl: string = Constants.inventoryUrl + "/add";
    public static inventorySetUrl: string = Constants.inventoryUrl + "/set";
    public static inventoryRemoveUrl: string = Constants.inventoryUrl + "/remove";

    //Dish endpoints
    public static dishSuggestUrl: string = Constants.dishUrl + "/suggest";
}