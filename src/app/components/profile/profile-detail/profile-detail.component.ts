import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { ProfileDetails } from 'src/app/shared/models/profile-details';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {

  title = "Profile Detail"
  username = '';
  path = environment.baseURI;
  model: ProfileDetails;
  constructor(private route: Router,private _notify : NotifyService, private _router: ActivatedRoute, private _service: ProfileService) {
    this.model = new ProfileDetails();
  }

  ngOnInit(): void {
    this._router.params.subscribe(params => {
      this.username = params['slug'];
      this.getProfile();
    });
  }

  getProfile() {
    let params: any = {};
    params.username = this.username;
    this._service.getProfileDetail(params).subscribe(res => {
      this.model = res;
    })
  }

  deleteProfile() {
    if (confirm("Are you sure to delete " + this.model.fullname + " profile")) {
      let params: any = {};
      params.username = this.username;
      this._service.deleteProfile(params).subscribe(res => {
        this._notify.showSuccess(res.msg,'Profile');
        this.route.navigate(['/profile']);
      })
    }
  }
}
