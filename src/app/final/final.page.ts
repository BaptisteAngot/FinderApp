import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { Storage} from "@ionic/storage";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-final',
  templateUrl: './final.page.html',
  styleUrls: ['./final.page.scss'],
})
export class FinalPage implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
        .append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-Auth')
        .append('Access-Control-Allow-Origin', 'http://185.216.25.16:7000/')
  };
  apiUrl = 'http://185.216.25.16:7000/';
  bestForm;
  load = false;
  cards = [];
  constructor(
      private router: Router,
      private storage: Storage,
      private api: HttpClient
  ) {
    setTimeout(()=>{

    },2000);
    this.getBestForm();
    setTimeout(() => {
      this.getResponseCard();
      console.log(this.bestForm);
      this.cards = [{
        pic: 'http://angotbaptiste.com/telechargement.png',
        name: this.bestForm,
        description: 'Êtes-vous d\'accord ?'
      }];
    },500);
  }

  ngOnInit() {
    this.load = true;
  }

  getBestForm() {
    this.storage.get('bestform').then((response) => {
      this.bestForm = response;
    });
  }

  logChoice(event) {
    var infouser = [];
    if(event.choice == true){
      this.storage.get('info_user').then((response) => {
        infouser.push(response);
      });
      this.storage.get('schoolselect').then((response) => {
        infouser.push(response);
      });
      setTimeout(() => {
        var resulttotal = [{
          name: infouser[0].nom,
          surname: infouser[0].prenom,
          email: infouser[0].email,
          age: infouser[0].age ,
          telephone: infouser[0].tel ,
          last_diploma: infouser[0].lastdiplome ,
          id_formation: infouser[1]
        }];
        let tabaenvoyer = resulttotal[0];;
        console.log(tabaenvoyer);
        this.api.post(this.apiUrl+'infos/', tabaenvoyer, this.httpOptions).subscribe((data: any) => {
          console.log(data)
        }, error => {
          console.log(error);
        });
        this.router.navigate(['thanks'])
      },1000);
    }
    else{
      this.router.navigate(['thanks']);
    }
  }

  getResponseCard() {
    this.storage.get('USER_INFO').then((reponse) => {
      console.log(reponse);
    })
  }

}
