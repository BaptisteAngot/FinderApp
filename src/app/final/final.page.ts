import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { Storage} from "@ionic/storage";

@Component({
  selector: 'app-final',
  templateUrl: './final.page.html',
  styleUrls: ['./final.page.scss'],
})
export class FinalPage implements OnInit {

  cards;
  constructor(
      private router: Router,
      private storage: Storage
  ) {
    this.getResponseCard();
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

  getResponseCard() {
    this.storage.get('USER_INFO').then((reponse) => {
      console.log(reponse);
    })
  }

}
