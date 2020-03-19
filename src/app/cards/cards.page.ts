import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage {
  cards;
  tabresponse = [];
  i = 0;
  numberOfCards;
  constructor(
      private storage: Storage,
      private router: Router) {
    this.cards = [];
    this.cards = this.loadTinderCards();
    this.numberOfCards = this.countcards();
    console.log('Il y a : ' + this.numberOfCards + ' cartes');
  }

  loadTinderCards() {
    return this.cards = [
      {
        img: 'https://placeimg.com/300/300/people',
        title: 'Êtes vous beau ?',
        description: 'Mais dans le fond, qu\'est ce que la beauté'
      },
      {
        img: 'https://placeimg.com/300/300/animals',
        title: 'Aimez vous les animaux ?',
        description: 'Vous êtes fan de doggo ? Vous ne vous voyez pas votre vie dans petit minou'
      },
      {
        img: 'https://placeimg.com/300/300/nature',
        title: 'Demo card 3',
        description: 'Les sorties dans les bois, qui sont à ce jour interdite'
      },
      {
        img: 'https://placeimg.com/300/300/tech',
        title: 'Jeux vidéo',
        description: 'Il est pour vous impératif de rester Global Elite. Une partie de LOL ne vous fait pas peur.'
      }
    ];
  }

  countcards() {
    return Object.keys(this.cards).length;
  }

  logChoice(event) {
    const response = {
      cards : event.payload.title,
      value: event.choice
    };
    this.tabresponse.push(response);
    if (this.numberOfCards - 1 > this.i) {
      this.i++
    } else {
      this.sendInSession(this.tabresponse);
      this.router.navigate(['final']);
    }
  }

  sendInSession(data) {
    this.storage.set('USER_INFO', data);
  }

  getUserInfo() {
    this.storage.get('USER_INFO').then((response) => {
      console.log(response);
    });
  }

}
