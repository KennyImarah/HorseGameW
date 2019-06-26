import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
    
    constructor(private http: HttpClient) { }

  ngOnInit() {
  }
    onSubmit(value: any): void {
        console.log(value.value["login"])
        this.http.post("http://avellinfalls.com/home/add_new_user",
            {

                "login": JSON.stringify(value.value["login"])
            })

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
