import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";

@Component({
  selector: 'app-final',
  templateUrl: './final.page.html',
  styleUrls: ['./final.page.scss'],
})
export class FinalPage implements OnInit {

  cards;
  constructor(
      private router: Router
  ) {
    this.cards = [];
    this.cards = this.loadTinderCards();
  }

  loadTinderCards() {
    return this.cards = [
      {
        img: 'http://angotbaptiste.com/telechargement.png',
        title: 'Felicitation vous pouvez rejoindre la promo: ',
        description: 'Êtes-vous d\'accord ?'
      }
    ];
  }

  ngOnInit() {
  }

  logChoice(event) {
    this.router.navigate(['thanks'])
  }

}
