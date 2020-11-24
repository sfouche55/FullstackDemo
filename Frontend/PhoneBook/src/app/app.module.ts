import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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

import { HomeComponent } from './components/home/home.component';
import { ViewContactsComponent } from './components/view-contacts/view-contacts.component';
import { ManageContactComponent } from './components/manage-contact/manage-contact.component';
import { ContactService } from './services/contact.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewContactsComponent,
    ManageContactComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    //MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
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
    ContactService
  ],
  entryComponents: [
    ManageContactComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
