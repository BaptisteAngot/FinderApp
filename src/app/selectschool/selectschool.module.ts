import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectschoolPageRoutingModule } from './selectschool-routing.module';

import { SelectschoolPage } from './selectschool.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectschoolPageRoutingModule
  ],
  declarations: [SelectschoolPage]
})
export class SelectschoolPageModule {}
