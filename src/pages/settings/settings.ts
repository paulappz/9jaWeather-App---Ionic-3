import { Component ,NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  city: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage:Storage, public zone: NgZone ) {

      this.storage.get('location_params').then((val) => {
        if(val != null){
           let location_params = JSON.parse(val);
          this.city = location_params.city;
        } else {
          this.city = 'Ikorodu';
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  saveForm(){
    let location_params = {
      city: this.city
    }
     this.zone.run(() => {
    this.storage.set('location_params', JSON.stringify(location_params));
     })
  this.navCtrl.setRoot(TabsPage);
  }

}
