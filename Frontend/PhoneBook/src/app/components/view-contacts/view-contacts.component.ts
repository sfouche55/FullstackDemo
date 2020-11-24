import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

  public contacts: Array<ContactModel>;
  public currentContact: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private contactService: ContactService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.get().subscribe((data) => {
      this.contacts = data;
      this.dataSource = new MatTableDataSource(this.contacts);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, 
    (err) => {});
  }

  editContact(record: ContactModel) {
    const dialogRef = this.dialog.open(ManageContactComponent, { data: record });
    dialogRef.afterClosed().subscribe( result => {
      if (result != null) {
        this.getContacts();
      }
    })
  }

  addContact() {
    this.editContact(null);
  }
    
      deleteContact(record: ContactModel) {
    this.contactService.remove(record).subscribe(
      result => this.getContacts()
    );
  }

}
