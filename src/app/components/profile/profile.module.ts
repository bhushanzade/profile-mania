import { EditProjectsComponent } from './profile-edit/edit-projects/edit-projects.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileRoutes } from 'src/app/core/routing/profile.routing';
import { ProfilesListComponent } from './profiles-list/profiles-list.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileAddComponent } from './profile-add/profile-add.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { GeneralModule } from 'src/app/core/pages/general/general.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { AddProjectsComponent } from './profile-add/add-projects/add-projects.component';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NotifyService } from 'src/app/shared/services/notify.service';

const componets = [
  ProfilesListComponent, ProfileDetailComponent, ProfileAddComponent, ProfileEditComponent, AddProjectsComponent,  EditProjectsComponent
]

@NgModule({
  declarations: [ ...componets ],
  imports: [
    CommonModule,
    GeneralModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    RouterModule.forChild(ProfileRoutes),
  ],
  providers:[ProfileService,NotifyService]
})
export class ProfileModule { }
