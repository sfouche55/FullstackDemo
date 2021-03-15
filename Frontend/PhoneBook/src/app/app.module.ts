import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { HomeComponent } from './components/home/home.component';
import { ViewContactsComponent } from './components/view-contacts/view-contacts.component';
import { ManageContactComponent } from './components/manage-contact/manage-contact.component';

import { ContactService } from './services/contact.service';
import { HttpErrorInterceptorService } from './services/http-error-interceptor.service';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';
import { NotificationService } from './services/notification.service';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewContactsComponent,
    ManageContactComponent,
    ConfirmDialogComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    ContactService,
    { 
      provide: ErrorHandler, 
      useClass: GlobalErrorHandlerService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    },
    NotificationService
  ],
  entryComponents: [
    ManageContactComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
