import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  form: FormGroup;
  public userService: UserService;

  firstName = new FormControl("", Validators.required);
    loginEmail: any;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      "loginEmail": this.loginEmail,
      "password": ["", Validators.required]
    });
  }
  onSubmit() {
    
    console.log("form submitted");
    console.log(this.form);
    this.userService.loginUsers(this.form.value)
    .subscribe(result => {
      console.log(result);
      
      
    })
  }
}
