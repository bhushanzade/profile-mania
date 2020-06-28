import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EditProfile } from 'src/app/shared/models/edit-profile';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.component.html'
})
export class EditProjectsComponent implements OnInit {

  projectTitle: string = "";
  @Input() model: EditProfile = new EditProfile();

  constructor(private _service: ProfileService,private _notify : NotifyService) { }

  ngOnInit(): void {
  }

  save() {
    let data = {
      title: this.projectTitle,
      profile: this.model.pk
    }
    this._service.saveProject(data).subscribe(response => {
      this._notify.showSuccess(response.msg,'PROJECT');
      this.model.projects.push(response.data);
      this.projectTitle = "";
    })
  }

  delete(item: Project) {
    if (confirm("Are you sure to delete this Project : " + item.title)) {
      let params: any = {};
      params.pk = item.pk;
      this._service.deleteProject(params).subscribe(res => {
        this._notify.showSuccess(res.msg,'PROJECT');
        for (let items of this.model.projects) {
          if (items === item) {
            this.model.projects.splice(this.model.projects.indexOf(item), 1);
            break;
          }
        }
      });
    }
  }
}

class Project {
  title: string = '';
  pk: string = '';
}