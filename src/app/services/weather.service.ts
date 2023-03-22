import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Weather } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiKey: string = 'your_api_key_here';
  private readonly apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather';
  private _currentWeather: BehaviorSubject<Weather | null> = new BehaviorSubject<Weather | null>(null);

  constructor(private httpClient: HttpClient) {}

  public get currentWeather() {
    return this._currentWeather.asObservable();
  }

  public fetchWeatherByCity(city: string): void {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    this.httpClient.get<Weather>(url).subscribe((weatherData) => {
      this._currentWeather.next(weatherData);
    });
  }

  // Add other methods to fetch weather by coordinates or other criteria if needed
}
