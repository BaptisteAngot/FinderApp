import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectschoolPage } from './selectschool.page';

const routes: Routes = [
  {
    path: '',
    component: SelectschoolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectschoolPageRoutingModule {}
