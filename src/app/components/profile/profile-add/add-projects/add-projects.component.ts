import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.scss']
})
export class AddProjectsComponent implements OnInit {

  @Output() setProjectList = new EventEmitter();

  projectTitle: string = "";
  projectList: Project[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  save() {
    let data = {
      projectTitle: this.projectTitle
    }
    this.projectList.push(data);
    this.setProjectList.emit(this.projectList);
    this.projectTitle = '';
  }

  delete(item: Project) {
    for (let items of this.projectList) {
      if (items === item) {
        this.projectList.splice(this.projectList.indexOf(item), 1);
        break;
      }
    }
    this.setProjectList.emit(this.projectList);
  }
}

class Project {
  projectTitle: string = '';
}