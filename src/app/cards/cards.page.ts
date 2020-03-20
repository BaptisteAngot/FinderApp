import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {forEach} from "@angular-devkit/schematics";
import {log} from "util";
import {timeout} from "rxjs/operators";

@Component({
    selector: 'app-cards',
    templateUrl: './cards.page.html',
    styleUrls: ['./cards.page.scss'],
})
export class CardsPage {

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
            .append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-Auth')
            .append('Access-Control-Allow-Origin', 'http://185.216.25.16:7000/')
    };
    cards;
    tabresponse = [];
    i = 0;
    numberOfCards;
    schoolselect;
    apiUrl = 'http://185.216.25.16:7000/';
    listForm = [];
    cardsByForm = [];
    private y: any;

    constructor(
        private storage: Storage,
        private router: Router,
        private api: HttpClient
    ) {
        this.getschool();
        setTimeout(() => {
            this.getFormFromSchool(this.schoolselect);
            setTimeout(() => {
                // console.log(Object.keys(this.listForm).length);
                for (this.y = 0; Object.keys(this.listForm).length > this.y; this.y++) {
                    this.getCardsFromForm(this.listForm[this.y].id);
                }
                setTimeout(() => {
                    console.log(this.cardsByForm)
                }, 100)
            }, 500);
        }, 100);
        // this.cards = this.loadTinderCards();
        this.numberOfCards = this.countcards();
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
        return Object.keys(this.cardsByForm).length;
    }

    logChoice(event) {
        const response = {
            cards: event.payload.title,
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

    getschool() {
        this.storage.get('schoolselect').then((response) => {
            this.schoolselect = response;
        })
    }

    getFormFromSchool(idschool) {
        this.api.get(this.apiUrl + 'formations/byschool/' + idschool, this.httpOptions).subscribe((data: any) => {
            data.forEach(element => {
                this.listForm.push(element);
            });
        });
    }

    getCardsFromForm(idForm) {
        this.api.get(this.apiUrl + 'cards/byformation/' + idForm, this.httpOptions).subscribe((data: any) => {
            data.forEach(element => {
                this.cardsByForm.push(element);
            });
        });
    }
}
