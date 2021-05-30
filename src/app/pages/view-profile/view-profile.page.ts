import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {
  getBioData: any = [];
  name: any;
  constructor(
    public gs: GlobalService,
    public nc: NavController,
    public route: ActivatedRoute,
  ) {
    this.getBioData = JSON.parse(this.route.snapshot.queryParamMap.get('bio'));
    this.name = JSON.parse(this.route.snapshot.queryParamMap.get('name'));
    console.log("this.getBioData>>>>>>", this.getBioData);
    console.log("this.name>>>>>>", this.name);
  }

  ngOnInit() {
  }

}
