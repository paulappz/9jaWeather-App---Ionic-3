import { Component , NgZone} from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AccuweatherProvider } from '../../providers/accuweather/accuweather';
import { Storage } from '@ionic/storage';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  location_params: {
    city: string,
  }
  key: string;
  data: any;
  weather: any;


img_url = "https://developer.accuweather.com/sites/default/files/";

  constructor(public navCtrl: NavController,
    private accuweatherProvider: AccuweatherProvider,
    private storage: Storage, public zone: NgZone, public toast: ToastController) {
    }


  ionViewWillEnter() {
 this.storage.get('location_params').then((val) => {

      if (val != null) {
         this.zone.run(() => {
        this.location_params = JSON.parse(val);
         console.log(this.location_params);
         })

      } else {
        this.location_params = {
          city: 'Ikorodu'
        }
      }

      this.accuweatherProvider.getLocalKey(this.location_params.city).subscribe(data => {

      this.zone.run(() => {
         this.data = data;

      })
      if (this.data.length != 0 && this.data[0].Country.LocalizedName == 'Nigeria' && this.data[0].Country.LocalizedName != undefined) {
        this.key = data[0].Key;
         console.log(this.data);

        console.log(data[0].Country.LocalizedName);
        this.accuweatherProvider.getWeather(this.key).subscribe(weather => {

           this.zone.run(() => {
         this.weather = weather;
          console.log(this.weather);
          this.img_url = "https://developer.accuweather.com/sites/default/files/";
      })
          if (this.weather[0].WeatherIcon <= 9){
  this.img_url = this.img_url+'0'+this.weather[0].WeatherIcon+'-s.png';
}
else {
   this.img_url = this.img_url+this.weather[0].WeatherIcon+'-s.png';
}
console.log(this.img_url);

        });

      }
      else  {
            var toaster = this.toast.create({
      duration: 5000,
      position: 'button'
    });
        console.log(this.location_params + " i'snt a Nigerian City");
        this.navCtrl.push(SettingsPage);
         toaster.setMessage(this.location_params.city+" i'snt a valid, Enter a City in Nigeria");
            toaster.present();
            this.location_params.city = "";
      }
      });
    });

    }
  }

