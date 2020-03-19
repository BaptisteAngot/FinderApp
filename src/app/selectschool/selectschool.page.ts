import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-selectschool',
  templateUrl: './selectschool.page.html',
  styleUrls: ['./selectschool.page.scss'],
})
export class SelectschoolPage implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
        .append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-Auth')
        .append('Access-Control-Allow-Origin', 'http://185.216.25.16:7000/')
  };

  apiUrl = 'http://185.216.25.16:7000/schools';
  tabschool = [];
  constructor(
      private httpClient: HttpClient,
      private storage: Storage,
      private router: Router
  ) {
  }

  ngOnInit() {
    this.httpClient.get(this.apiUrl, this.httpOptions)
        .subscribe((data: any) => {
          this.tabschool.push(data);
        });
  }

  redirectCards(idcschool) {
    this.storage.set('schoolselect', idcschool);
    this.router.navigate(['home']);
  }

}
