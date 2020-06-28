import { Component, OnInit } from '@angular/core';
import { CreateProfile } from 'src/app/shared/models/create-profile';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Component({
  selector: 'app-profile-add',
  templateUrl: './profile-add.component.html',
  styleUrls: ['./profile-add.component.scss']
})
export class ProfileAddComponent implements OnInit {

  title = "Create Profile"
  model: CreateProfile;
  complexForm: FormGroup;
  formData: FormData;
  skills = [];
  image: File;
  imageUrl: any;
  gender = { option: 'Male' };
  radioItems: Array<string> = ['Male', 'Female', 'Other'];
  Hobbies: any[] = [];

  constructor(private router: Router, private _notify : NotifyService,private _router: ActivatedRoute, private formBuilder: FormBuilder, private _service: ProfileService) {
    this.model = new CreateProfile();
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
  }

  handleInputChange(event) {
    this.image = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  

  getProjectList($event) {
    this.model.projectList = $event;
  }

  create() {

    if (this.complexForm.invalid) {
      for (var i in this.complexForm.controls) {
        this.complexForm.controls[i].markAsTouched();
      }
      return;
    }

    if (this.model.projectList.length == 0) {
      this._notify.showError('Please add at least one project.', 'PROJECT');
      return;
    }

    if (!this.image) {
      this._notify.showError('Please add image.', 'IMAGE');
      return;
    }

    if (this.Hobbies.length == 0) {
      this._notify.showError('Please add at least one file.', 'File Not Added');
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
    this.formData.append("file", this.image, this.image.name);
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
    this.formData.append("projectList", JSON.stringify(this.model.projectList));

    this._service.saveProfile(this.formData).subscribe(res => {
      this._notify.showSuccess(res.msg,'PROFILE');
      this.router.navigate(['/profile/detail', res.username]);
    })

  }

}
