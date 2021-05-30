import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BioListPage } from './bio-list.page';

const routes: Routes = [
  {
    path: '',
    component: BioListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BioListPageRoutingModule {}
