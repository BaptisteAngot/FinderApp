import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";

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
    tabResultGlobal = [];

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
                    let toto = {
                        name: this.listForm[this.y].name,
                        id: this.listForm[this.y].id,
                        points: 0
                    };
                    this.tabResultGlobal.push(toto);
                    this.getCardsFromForm(this.listForm[this.y].id);
                }
                setTimeout(() => {
                    console.log(this.cardsByForm)
                }, 100)
            }, 500);
        }, 100);
        setTimeout(() => {
            this.numberOfCards = this.countcards();
        }, 1000);
    }

    countcards() {
        return Object.keys(this.cardsByForm).length;
    }

    logChoice(event) {
        if (this.numberOfCards - 1 > this.i) {
            const response = {
                cards: event.payload.name,
                points: event.payload.points,
                value: event.choice,
                formation: event.payload.formation
            };
            if (event) {
                if (event.choice == true) {
                    this.tabResultGlobal.forEach((formation) => {
                        if (formation.id == response.formation) {
                            formation.points = formation.points + response.points;
                        }
                    });
                }
            }
            this.i++;
        }
         else {
             let plusgrand = 0;
             let meilleurform;
            console.log(this.tabResultGlobal);
            this.tabResultGlobal.forEach((element) => {
                if (element.points > plusgrand) {
                    plusgrand = element.points;
                    meilleurform = element.name;
                }
            });
            if (plusgrand > 1){
                this.storage.set('bestform', meilleurform);
                this.router.navigate(['final']);
            }
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
