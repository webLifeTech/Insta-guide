import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdmobfreeService } from 'src/app/services/admobfree.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    public gs: GlobalService,
    public router: Router,
    public admobFree: AdmobfreeService,
  ) { }
  ngOnInit() {
  }

  goBioList(item) {
    this.admobFree.rendomAdShow();
    this.gs.selectedData = this.gs.arrayShuffle(item.data);
    item.data = this.gs.selectedData.filter((res, idx) => idx < 7)
    this.router.navigate(['/bio-list'], { queryParams: { data: JSON.stringify(item) } });
  }

}
