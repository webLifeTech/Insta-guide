import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BioListPageRoutingModule } from './bio-list-routing.module';

import { BioListPage } from './bio-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BioListPageRoutingModule
  ],
  declarations: [BioListPage]
})
export class BioListPageModule {}
