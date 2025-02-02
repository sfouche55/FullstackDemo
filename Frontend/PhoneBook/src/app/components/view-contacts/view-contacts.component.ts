import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { GlobalErrorHandlerService } from '../../services/global-error-handler.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ManageContactComponent } from '../manage-contact/manage-contact.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-view-contacts',
  templateUrl: './view-contacts.component.html',
  styleUrls: ['./view-contacts.component.css']
})
export class ViewContactsComponent implements OnInit {

  dataSource: MatTableDataSource<Contact>;
  displayedColumns: string[] = ['name', 'phoneNumber', 'actions'];
  pageSizeOptions = [5, 10, 25, 50];
  busy: boolean;

  public contacts: Array<Contact>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private contactService: ContactService,
    private errorHandlerService: GlobalErrorHandlerService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.busy = true;
    this.contactService.get().subscribe({
      next: (result) => {
        this.contacts = result;
        this.dataSource = new MatTableDataSource(this.contacts);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        this.errorHandlerService.handleError(error);
        this.busy = false;
      },
      complete: () => {
        this.busy = false;
      }
    });
  }

  editContact(record: Contact): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = record;

    const manageDialog = this.dialog.open(ManageContactComponent, dialogConfig);
    manageDialog.afterClosed().subscribe({
      next: (result) => {
        if (result != null) {
            this.getContacts();
        }
      }
    });
  }

  addContact(): void {
    this.editContact(null);
  }

  deleteContact(record: Contact): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const confirmDialogData: ConfirmDialogData = {
      title: 'Confirm Delete Contact',
      message: 'Are you sure you want to delete ' + record.name + '?'
    };
    dialogConfig.data = confirmDialogData;

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.contactService.remove(record).subscribe({
          next: () => {
            this.getContacts();
          },
          error: (error) => {
            this.errorHandlerService.handleError(error);
          }
        });
      }
    });
  }

}
