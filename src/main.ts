import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import {LayoutComponent} from './app/common/component/layout/layout.component';

bootstrapApplication(LayoutComponent, appConfig)
  .catch((err) => console.error(err));
