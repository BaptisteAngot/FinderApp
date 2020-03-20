import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage} from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  register: FormGroup;
  submitted = false;
  loading = false;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private storage: Storage
  ) {
    this.register = this.fb.group({
      nom: [''],
      prenom: [''],
      age: [''],
      tel: [''],
      email: [''],
      lastdiplome: [''],
    });
  }

  get f() {
    return this.register.controls;
  }


  signup() {
    this.submitted = true;
    this.loading = true;
    const val = this.register.value;
    this.storage.set('info_user', val);
    this.router.navigate(['cards']);
  }
}
