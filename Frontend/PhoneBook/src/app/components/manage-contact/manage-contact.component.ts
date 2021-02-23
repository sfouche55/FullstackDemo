import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ContactService } from '../../services/contact.service';
import { ContactModel } from '../../models/contact.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-contact',
  templateUrl: './manage-contact.component.html',
  styleUrls: ['./manage-contact.component.css']
})
export class ManageContactComponent implements OnInit {

  contact: ContactModel;
  contactForm: FormGroup;
  
  constructor(
    private dialogref : MatDialogRef<ManageContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContactModel,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.data == null) {
      this.contact = ContactModel.Create(undefined, "", "");
    } else {
      this.contact = ContactModel.Create(this.data.id, this.data.name, this.data.phoneNumber);
    }
    this.contactForm = this.formBuilder.group({
      name: [this.contact.name, Validators.required],
      phoneNumber: [this.contact.phoneNumber, Validators.required]
    });
  }

  onCancel() {
    this.dialogref.close(null);
  }

  onSave() {
    this.contact.name = this.contactForm.controls["name"].value;
    this.contact.phoneNumber = this.contactForm.controls["phoneNumber"].value;
    if (this.contact.id == undefined) {
      this.contactService.add(this.contact).subscribe(
        (result) => {
          this.dialogref.close(result);
        }, 
        (error: HttpErrorResponse) => {
          this.handleHttpErrorResponse(error);
          this.dialogref.close(null);
        }
      );
    } else {
      this.contactService.update(this.contact).subscribe(
        (result) => {
            this.dialogref.close(this.contact);
        }, 
        (error: HttpErrorResponse) => {
          this.handleHttpErrorResponse(error);
          this.dialogref.close(null);
        }
      );
    }
  }

  private handleHttpErrorResponse(error: HttpErrorResponse) {
    console.error(error);
    let errMsg: string;
    if (error.error instanceof ErrorEvent) {
      errMsg = error.error.message;
    } else {
      errMsg = error.message;
    }
    this.snackBar.open(errMsg, "OK", { duration: 5000 });
  }

  public handleError = (control: string, error: string) => {
    return this.contactForm.controls[control].hasError(error);
  }

}
