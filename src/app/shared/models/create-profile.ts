export class CreateProfile {
    fullname: string = '';
    username: string = '';
    email: string = '';
    phone: string = '';
    about: string = '';
    education : string = '';
    gender : string = '';
    hobbies : any[] = [];
    skills: any[] = [];
    projectList: any[] = [];
    likes : number = Math.floor(Math.random() * 1000) + 1  ;
    views : number = Math.floor(Math.random() * 1000) + 1  ;
}
