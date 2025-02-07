import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations'; // Import this
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  ...appConfig,  // Spread existing config
  providers: [
    ...appConfig.providers,  // Retain any other existing providers
    provideAnimations()       // Add this to enable animations
  ]
})
  .catch((err) => console.error(err));
