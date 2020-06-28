import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { AllProfileList } from 'src/app/shared/models/all-profile-list';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.scss']
})
export class ProfilesListComponent implements OnInit {

  title = "List of Profiles"
  search_string: string = '';
  pageIndex: number = 1;
  count : number = 0;
  pageSize = environment.pageSize;

  profileList: AllProfileList[] = [];

  constructor(private _service: ProfileService,private route : Router) {
    this.pageIndex = 1;
  }

  ngOnInit(): void {
    this.getAllProfileList();
  }

  getSearchData(){
    this.route.navigate(['/profile'], { queryParams: { search: this.search_string } });
    this.pageIndex = 1;
    this.getAllProfileList();
  }

  getAllProfileList() {
    let params: any = {};
    params.page = this.pageIndex;
    params.search = this.search_string;
    this._service.getAllProfileList(params).subscribe(response => {
      this.count = response.count;
      this.profileList = response.results;
    })
  }

  pageChanged(Event): any {
    this.pageIndex = Event;
    this.getAllProfileList();
  }

}
