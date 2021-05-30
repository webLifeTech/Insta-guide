import { Component } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  binding : any = 'New';
  data : any = true;
  constructor(
    public gs : GlobalService
  ) {}

  segmentChanged(event){
    this.binding = event.target.value;
  }
}
