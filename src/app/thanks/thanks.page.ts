import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Storage} from '@ionic/storage';


@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.page.html',
  styleUrls: ['./thanks.page.scss'],
})
export class ThanksPage implements OnInit {

  constructor(
      private router: Router,
      private storage: Storage
  ) { }

  ngOnInit() {
  }
  redirect() {
    this.storage.remove('USER_INFO');
    this.storage.remove('bestform');
    this.storage.remove('info_user');
    this.storage.remove('schoolselect');
    this.router.navigate(['selectschool']);
  }

   // Remove a key/value pair
  removeKey(key: string) {
    this.storage.remove(key).then(() => {
      console.log('removed ' + key);
    }).catch((error) => {
      console.log('removed error for ' + key + '', error);
    });
  }
}
