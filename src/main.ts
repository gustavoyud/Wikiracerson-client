import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/pages/app.routes';
import { environment } from './environments/environment';
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(APP_ROUTES)),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
  ],
}).catch((err) => console.error(err));
