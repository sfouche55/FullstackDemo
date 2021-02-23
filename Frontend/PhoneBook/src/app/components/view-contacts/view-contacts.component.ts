import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpErrorResponse } from "@angular/common/http";

import { ContactService } from '../../services/contact.service';
import { ContactModel } from '../../models/contact.model';

import { MatDialog } from '@angular/material/dialog';
import { ManageContactComponent } from '../manage-contact/manage-contact.component';

@Component({
  selector: 'app-view-contacts',
  templateUrl: './view-contacts.component.html',
  styleUrls: ['./view-contacts.component.css']
})
export class ViewContactsComponent implements OnInit {

  dataSource: MatTableDataSource<ContactModel>;
  displayedColumns: string[] = ['name', 'phoneNumber', 'actions'];
  pageSizeOptions = [5, 10, 25, 50];
  busy: boolean;

  public contacts: Array<ContactModel>;
  public currentContact: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private contactService: ContactService, 
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.busy = true;
    this.contactService.get().subscribe(
      (result) => {
        this.contacts = result;
        this.dataSource = new MatTableDataSource(this.contacts);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.busy = false;
      }, 
      (error: HttpErrorResponse) => {
        console.error(error);
        let errMsg: string;
        if (error.error instanceof ErrorEvent) {
          errMsg = error.error.message;
        } else {
          errMsg = error.message;
        }
        console.log("Error message: " + errMsg);
        this.snackBar.open(errMsg, "OK", { duration: 5000 });
        this.busy = false;
      }
    );
  }

  editContact(record: ContactModel) {
    const dialogRef = this.dialog.open(ManageContactComponent, { data: record });
    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result != null) {
            this.getContacts();
        } // else error has already been dealt with on closing the dialog
      }
    )
  }

  addContact() {
    this.editContact(null);
  }
    
  deleteContact(record: ContactModel) {
    this.contactService.remove(record).subscribe(
      (result) => {
        this.getContacts();
      },
      (error: HttpErrorResponse) => {
        let errMsg: string;
        if (error.error instanceof ErrorEvent) {
          errMsg = error.error.message;
        } else {
          errMsg = error.message;
        }
        this.snackBar.open(errMsg, "OK", { duration: 5000 });
      }
    )
  }

}
