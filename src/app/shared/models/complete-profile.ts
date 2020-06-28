export class CompleteProfile {
    pk: string = '';
    about: string = '';
    file: string = '';
    fullname: string = '';
    username: string = '';
    phone: string = '';
    email: string = '';
    education: string = '';
    gender: string = '';
    likes: number = 0;
    project_cnt: number = 0;
    views: number = 0;
    hobbies: Array<string>[] = [];
    projects: Project[] = [];
    skills: Array<string>[] = [];
}

class Project {
    title: string = '';
}