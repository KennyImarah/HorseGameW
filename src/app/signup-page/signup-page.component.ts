import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  //these are some getters to help with readability in the html
  get login() {
    return this.signupForm.get('login');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get email() {
    return this.signupForm.get('password');
  }

  ngOnInit() {
  }
  signupForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{8,}')]],//length of at least 8 aplhanumeric characters. Must contain lowercase uppercase and a number can contain special characters
    DoB: this.fb.group({
      day: [''],
      month: [''],
      year: [''],
    }),
    email: ['', [Validators.required, Validators.email]],
    terms: ['', [Validators.requiredTrue]]
  })

  onSubmit() {
    console.log(this.signupForm.value);
    this.http
      .post(
        'http://avellinfalls.com/home/add_new_user',
        JSON.stringify(
          "login", this.login.value
        )
      )
      .subscribe(
        (val) => {
          console.log("POST call successful value returned in body",
            val);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }
}
