import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

import { MatDialog } from '@angular/material/dialog';
import { ManageContactComponent } from '../manage-contact/manage-contact.component';

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
      error: () => {
        this.busy = false;
      },
      complete: () => {
        this.busy = false;
      }
    });
  }

  editContact(record: Contact): void {
    const dialogRef = this.dialog.open(ManageContactComponent, { data: record });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result != null) {
            this.getContacts();
        }
      }
    })
  }

  addContact(): void {
    this.editContact(null);
  }
    
  deleteContact(record: Contact): void {
    this.contactService.remove(record).subscribe({
      next: () => {
        this.getContacts();
      },
      error: () => {
        // error handled by interceptor
      }
    })
  }

}
