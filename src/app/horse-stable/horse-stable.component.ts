import { Component, OnInit } from '@angular/core';
import { HorseService } from '../../services/horse.service';
import { Horse } from '../horse';


@Component({
  selector: 'app-horse-stable',
  templateUrl: './horse-stable.component.html',
  styleUrls: ['./horse-stable.component.css']
})
export class HorseStableComponent implements OnInit {
  horseService: HorseService;
  horses: Horse[] = [];

  constructor(horseService: HorseService) {
    this.horseService = horseService;
  }

  ngOnInit() {
    this.horseService.getHorses().subscribe(
        res => {
        console.log(res[0].payload.doc.id)
        let br = res as Array<any>;
        for (let i = 0; i < br.length; i++) {
          let horse = new Horse(br[i].payload.doc.id);
          this.horses.push(horse);
        }
      })
  }

}
