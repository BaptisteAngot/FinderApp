import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardsPageRoutingModule } from './cards-routing.module';

import { CardsPage } from './cards.page';
import {TinderUiComponent} from "../tinder-ui/tinder-ui.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardsPageRoutingModule
  ],
  exports: [
    TinderUiComponent
  ],
  declarations: [CardsPage, TinderUiComponent]
})
export class CardsPageModule {}
