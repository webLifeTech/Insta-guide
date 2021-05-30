import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { AdmobfreeService } from 'src/app/services/admobfree.service';

@Component({
  selector: 'app-bio-list',
  templateUrl: './bio-list.page.html',
  styleUrls: ['./bio-list.page.scss'],
})
export class BioListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  getCatBioObj: any = {};
  binding: any = 'New';
  data: any = true;

  constructor(
    public gs: GlobalService,
    public route: ActivatedRoute,
    public router: Router,
    public admobFree: AdmobfreeService,
  ) {
    this.getCatBioObj = JSON.parse(this.route.snapshot.queryParamMap.get('data'));
  }

  ngOnInit() {
  }

  loadData(event) {
    let tempdata = []
    let lth = this.getCatBioObj['data'].length
    if (lth == 28 || lth == 56 || lth == 84 || lth == 112 || lth == 130 || lth == 158 || lth == 186) {
      this.admobFree.rendomAdShow();
    }
    this.gs.selectedData.slice(this.getCatBioObj['data'].length).forEach((value) => {
      if (tempdata.length < 7) {
        tempdata.push(value);
        this.getCatBioObj['data'].push(value);
      } else {
        return
      }
    });
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  segmentChanged(event) {
    this.binding = event.target.value;
  }

  viewProfile(item, name) {
    this.admobFree.rendomAdShow();
    this.router.navigate(['/view-profile'], { queryParams: { bio: JSON.stringify(item), name: JSON.stringify(name) } });
  }

}
