import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private weatherService: WeatherService) {
    this.weatherService.currentWeather.subscribe((weatherData) => {
      const weatherType = weatherData?.weather[0].main;
      this.setBackgroundImage(weatherType);
    });
  }

  setBackgroundImage(weatherType: string | undefined): void {
    if (weatherType) {
      const backgroundImage = this.getImageForWeatherType(weatherType);
      document.body.style.backgroundImage = `url(${backgroundImage})`;
    } else {
      // Set a default background image when weatherType is null
      document.body.style.backgroundImage = `url('path/to/default-image.jpg')`;
    }
  }

  getImageForWeatherType(weatherType: string): string {
    // Replace with your own images or URL patterns
    const images: { [key: string]: string } = {
      Clear: 'path/to/clear-sky-image.jpg',
      Clouds: 'path/to/clouds-image.jpg',
      Rain: 'path/to/rain-image.jpg',
      // ... other weather types
    };

    return images[weatherType] || 'path/to/default-image.jpg';
  }
}
