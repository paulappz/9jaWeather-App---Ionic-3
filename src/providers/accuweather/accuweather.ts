import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AccuweatherProvider {
  apiKey= 'J2ui6WoCFXUkLUK7SVdXrb0iJKQnEbrs';
  url1;
  url2;


  constructor(public http: Http) {
    console.log('Hello WeatherProvider Provider');
    this.url1 = 'http://dataservice.accuweather.com/locations/v1/search?q=';
   this.url2 = 'http://dataservice.accuweather.com/currentconditions/v1/'
  }

  getLocalKey(localarea){
     console.log(localarea);
    return this.http.get(this.url1+localarea+'&apikey='+this.apiKey)
      .map(res => res.json());
  }

//http://dataservice.accuweather.com/locations/v1/search?q=Ikorodu&apikey=J2ui6WoCFXUkLUK7SVdXrb0iJKQnEbrs
//http://dataservice.accuweather.com/currentconditions/v1/253770?apikey=J2ui6WoCFXUkLUK7SVdXrb0iJKQnEbrs&details=true
  getWeather(key){
    console.log(key);
      return this.http.get(this.url2+key+'?'+'apikey='+this.apiKey+'&details=true')
      .map(res => res.json());
  }
}

