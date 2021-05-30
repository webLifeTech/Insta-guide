import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, IonRouterOutlet, Platform } from '@ionic/angular';
import { AdmobfreeService } from './services/admobfree.service';
import { GlobalService } from './services/global.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
declare var window: any

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
  constructor(
    private platform: Platform,
    private router: Router,
    public admobFree: AdmobfreeService,
    public gs: GlobalService,
    public ac: ActionSheetController,
    public av: AppVersion,
  ) {
    this.initializeApp();


    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        console.log(">>>>>" + this.routerOutlet);
        this.routerOutlet.pop();
      } else if (this.router.url) {
        console.log("rrrrrrrrrrrrrrrrrr" + this.router.url);
        if (this.router.url != '/tabs/home') {
          this.router.navigate(['/tabs/home']);
        } else {
          navigator['app'].exitApp();
        }
      }
    })
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.admobFree.showInterstitialAds();
      try {
        window.cordova.plugins.firebase.config.fetch(1).then((isfetch: any) => {
          window.cordova.plugins.firebase.config.fetchAndActivate().then((res: any) => {
            window.cordova.plugins.firebase.config.getString('getAllurl').then((res2: any) => {
              this.gs.fireBaseUrl = JSON.parse(res2);
              this.gs.getAllBios = this.gs.fireBaseUrl["allBios"]; // Temp
              this.gs.getAllBios[4].data = this.gs.getAllBios[0].data.concat(this.gs.getAllBios[1].data)
              this.gs.getAllBios[5].data = this.gs.getAllBios[2].data.concat(this.gs.getAllBios[3].data)
              // var children = this.gs.getAllBios[0].data.concat(this.gs.getAllBios[1].data);
              // console.log("fireBaseUrl>>>>>>>>>>>>>" + JSON.stringify(this.gs.fireBaseUrl))
              this.av.getVersionNumber().then(crVersion => {
                this.gs.crVersion = crVersion;
                if (crVersion != this.gs.fireBaseUrl['appVersion']) {
                  this.appUpdate();
                }
              })
            }).catch((error: any) => console.error(error));
          });
        }).catch((err) => {
          console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' + err);
        });
      } catch (ex) {
        console.log('exexexexexexexexexexexexexexexex++++++++++++' + ex);
      }
      this.admobFree.adMobFreeBanner();
    });
  }

  async appUpdate() {
    const actionSheet = await this.ac.create({
      header: 'Anjoy New Version',
      mode: 'ios',
      buttons: [{
        text: 'Update Now',
        handler: () => {
          this.gs.rateApp();
        }
      }, {
        text: 'New v' + this.gs.fireBaseUrl['appVersion'],
        handler: () => {
          this.gs.rateApp();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    await actionSheet.present();
  }
}
