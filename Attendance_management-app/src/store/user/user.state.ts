export interface UserState{
    id:number|null;
    name:string|null;
    email:string|null;
    role:string|null;
    permissions:string[]|null;
    profilepicture:string|null;
}

export const initialStateUserData:UserState = {
    id:null,
    name:null,
    email:null,
    role:null,
    permissions:[],
    profilepicture:null
}