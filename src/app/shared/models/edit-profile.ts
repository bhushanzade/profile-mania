export class EditProfile {
    pk : string = '';
    file : string = '';
    fullname: string = '';
    username: string = '';
    email: string = '';
    phone: string = '';
    about: string = '';
    education : string = '';
    gender : string = '';
    hobbies : any[] = [];
    skills: any[] = [];
    projects: any[] = [];
    likes : number = Math.floor(Math.random() * 1000) + 1  ;
    views : number = Math.floor(Math.random() * 1000) + 1  ;
}
