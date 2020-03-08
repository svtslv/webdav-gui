process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

import 'reflect-metadata';
import './polyfills';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppConfig } from './environments/environment';

if (AppConfig.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, { preserveWhitespaces: false })
  .catch(err => console.error(err));
