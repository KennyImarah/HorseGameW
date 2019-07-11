import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Horse } from '../horse';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent implements OnInit {
  horse: Horse;
  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    console.log(AuthService.uid); //TODO:
    this.router.paramMap.pipe(map(() => window.history.state)).subscribe(res => {
      this.horse = res as Horse;
    })
  }


}
