import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signIn = false;
  constructor(private fb: FormBuilder,
              private router: Router,
              public userService: UserService) { }

  ngOnInit() {
  }

  loginForm = this.fb.group({
    login: [''],
    password: [''],
    stay: ['']
  })

  onLogin() {
    console.log(this.loginForm.value);
    this.userService.loginUsers(this.loginForm.value)
      .subscribe(res => {
        console.log(res)
      })
  }
}
