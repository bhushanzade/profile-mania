import { EditProfile } from './../../../shared/models/edit-profile';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { environment } from 'src/environments/environment';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  title = "Edit Profile"
  model: EditProfile;
  complexForm: FormGroup;
  formData: FormData;
  image: File;
  imageUrl: any;
  gender = { option: 'Male' };
  radioItems: Array<string> = ['Male', 'Female', 'Other'];
  Hobbies: any[] = [];
  username = '';

  constructor(private router: Router,private _notify : NotifyService, private _router: ActivatedRoute, private formBuilder: FormBuilder, private _service: ProfileService) {
    this.model = new EditProfile();
    this.complexForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      about: ['', Validators.required],
      skills: ['', Validators.required],
      likes: ['', Validators.required],
      views: ['', Validators.required],
      education: ['', Validators.required],
    });

    this.Hobbies = [
      {
        is_Selected: false,
        name: 'Reading'
      },
      {
        is_Selected: false,
        name: 'Writing'
      },
      {
        is_Selected: false,
        name: 'Travelling'
      },
      {
        is_Selected: false,
        name: 'Swimming'
      },
      {
        is_Selected: false,
        name: 'Play Games'
      },
      {
        is_Selected: false,
        name: 'Gym'
      },
      {
        is_Selected: false,
        name: 'Dancing'
      },
      {
        is_Selected: false,
        name: 'Riding'
      },

    ]
  }

  get f() {
    return this.complexForm.controls;
  }

  ngOnInit() {
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
      this.imageUrl = environment.baseURI + this.model.file;
      this.Hobbies.forEach(res => {
        let name = this.model.hobbies.find(this.findHobby, res.name);
        if(name == res.name)res.is_Selected = true;
      })
    })
  }

  findHobby(item) {
    return item === this;
  }

  handleInputChange(event) {
    this.image = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  edit() {

    if (this.complexForm.invalid) {
      for (var i in this.complexForm.controls) {
        this.complexForm.controls[i].markAsTouched();
      }
      return;
    }

    if (!this.imageUrl) {
      this._notify.showError('Please add image.', 'IMAGE');
      return;
    }

    if (this.Hobbies.length == 0) {
      this._notify.showError('Please add at least one hobby.', 'HOBBY');
      return;
    }

    this.model.gender = this.gender.option;
    this.model.hobbies = [];
    this.Hobbies.forEach(res => {
      if (res.is_Selected == true) {
        this.model.hobbies.push(res.name);
      }
    });

    this.formData = new FormData();
    if(this.image)this.formData.append("file", this.image, this.image.name);
    this.formData.append("username", this.model.username);
    this.formData.append("email", this.model.email);
    this.formData.append("fullname", this.model.fullname);
    this.formData.append("about", this.model.about);
    this.formData.append("phone", this.model.phone);
    this.formData.append("gender", this.model.gender);
    this.formData.append("education", this.model.education);
    this.formData.append("likes", this.model.likes.toString());
    this.formData.append("views", this.model.views.toString());
    this.formData.append("skills", this.model.skills.toString());
    this.formData.append("hobbies", this.model.hobbies.toString());
    this._service.updateProfile(this.formData,this.model.pk).subscribe(res => {
      this._notify.showSuccess(res.msg,'PROFILE');
      this.router.navigate(['/profile/detail', res.username]);
    })

  }


}
