import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HorseService {
  
  constructor(public db: AngularFirestore) { }

  getRandStat(): number {
    return Math.floor((Math.random() * 100) + 1);
  }

  createRandomHorse(value) {
    let stamina = this.getRandStat();
    return this.db.collection('horses').add({
      breed: value.breed_id,
      color: value.color_id,
      name: 'Strawberry',
      gender: 'mare',

    });
  }

  getHorses() {
    return this.db.collection('/horses').valueChanges()
  }
}
