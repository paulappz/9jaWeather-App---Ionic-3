import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherProvider {
  apiKey = '99dfe35fcb7de1ee';
  url;

  constructor(public http: Http) {
    console.log('Hello WeatherProvider Provider');
    this.url = 'http://api.wunderground.com/api/'+this.apiKey+'/conditions/q';
  }

  getWeather(city, state){
    return this.http.get(this.url+'/'+state+'/'+city+'.json')
      .map(res => res.json());

  }

}


//http://dataservice.accuweather.com/locations/v1/adminareas/NGR001?apikey=J2ui6WoCFXUkLUK7SVdXrb0iJKQnEbrs
//api.wunderground.com/api/99dfe35fcb7de1ee/conditions/q/washington/dc.json
