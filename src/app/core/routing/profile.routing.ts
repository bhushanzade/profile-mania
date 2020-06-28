import { ProfileDetailComponent } from './../../components/profile/profile-detail/profile-detail.component';
import { Routes } from "@angular/router";
import { ProfilesListComponent } from 'src/app/components/profile/profiles-list/profiles-list.component';
import { ProfileEditComponent } from 'src/app/components/profile/profile-edit/profile-edit.component';
import { ProfileAddComponent } from 'src/app/components/profile/profile-add/profile-add.component';
export const ProfileRoutes: Routes = [
    {
        path: '',
        component : ProfilesListComponent
    },
    {
        path: 'detail/:slug',
        component : ProfileDetailComponent
    },
    {
        path: 'edit/:slug',
        component : ProfileEditComponent
    },
    {
        path: 'create',
        component : ProfileAddComponent
    },
];


