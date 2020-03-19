import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Storage} from '@ionic/storage';


@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.page.html',
  styleUrls: ['./thanks.page.scss'],
})
export class ThanksPage implements OnInit {

  constructor( private router: Router,
    private storage: Storage) { }

  ngOnInit() {
  }
  redirect() {
    this.router.navigate(['thanks']);
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
