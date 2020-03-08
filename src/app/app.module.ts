import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './shared/components/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebviewDirective } from './shared/directives/webview.directive';
import { ElectronService } from './shared/services/electron.service';
import { StorageService } from './shared/services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    WebviewDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDividerModule,
  ],
  providers: [ElectronService, StorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
