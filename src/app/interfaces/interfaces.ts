export interface IUser {
    name?:string;
    email?:string;
    password?:string
}

export interface IUserToken{
    ok:boolean,
    token:string
}
