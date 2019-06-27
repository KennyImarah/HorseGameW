import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Breed } from '../breed';
import { Color } from '../color';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  breeds: Breed[] = [];
  allBreeds: Breed[];

  // colors 
  colors: Color[] = [];
  allColors: Color[]; 
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }
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
    // makeHeaders();
    console.log('success');
    this.allBreeds = this.getBreeds();
    this.allColors = this.getColors();
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

  getBreeds(): Breed[] {
    this.http
      .get<{ [key: string]: any }>('http://avellinfalls.com/home/new_account_display_breeds')
      .pipe(
        map(responseData => {
          let dataBreed: any;
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              dataBreed = responseData[key]
            }
          }
          return dataBreed;
        }))
      .subscribe(data => {
        let br = data as Array<Breed>;
        for (let i = 0; i < br.length; i++) {
          let breed = new Breed(br[i].id, br[i].breed, br[i].breed_id);
          this.breeds.push(breed);
        }
      })
    return this.breeds;
  }

  getColors(): Color[] {
    this.http
      .get<{ [key: string]: any }>('http://avellinfalls.com/home/new_account_display_colors')
      .pipe(
        map(responseData => {
          let dataColor: any;
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              dataColor = responseData[key]
            }
          }
          return dataColor;
        }))
      .subscribe(data => {
        let cl = data as Array<Color>;
        for (let i = 0; i < cl.length; i++) {
          let color = new Color(cl[i].id, cl[i].color, cl[i].color_id);
          this.colors.push(color);
        }
      })
    return this.colors;
  }

  onSubmit() {
    console.log(this.signupForm.value);
    this.http
      .post(
        'http://avellinfalls.com/home/add_new_user',
        {
          "login": this.login.value
        }
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

    this.router.navigate(['/play']);
  }
}
