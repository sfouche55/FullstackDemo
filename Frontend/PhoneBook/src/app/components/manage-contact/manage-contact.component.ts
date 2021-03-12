import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-manage-contact',
  templateUrl: './manage-contact.component.html',
  styleUrls: ['./manage-contact.component.css']
})
export class ManageContactComponent implements OnInit {

  contact: Contact;
  contactForm: FormGroup;
  
  constructor(
    private dialogref : MatDialogRef<ManageContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact,
    private formBuilder: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    if (this.data == null) {
      this.contact = { id: undefined, name: '', phoneNumber: '' };
    } else {
      this.contact = { id: this.data.id, name: this.data.name, phoneNumber: this.data.phoneNumber };
    }
    this.contactForm = this.formBuilder.group({
      name: [this.contact.name, Validators.required],
      phoneNumber: [this.contact.phoneNumber, Validators.required]
    });
  }

  onCancel(): void {
    this.dialogref.close(null);
  }

  onSave(): void {
    this.contact.name = this.contactForm.controls['name'].value;
    this.contact.phoneNumber = this.contactForm.controls['phoneNumber'].value;
    if (this.contact.id == undefined) {
      this.contactService.add(this.contact).subscribe({
        next: (result) => {
          this.dialogref.close(result);
        }, 
        error: () => {
          this.dialogref.close(null);
        }
      });
    } else {
      this.contactService.update(this.contact).subscribe({
        next: () => {
          this.dialogref.close(this.contact);
        }, 
        error: () => {
          this.dialogref.close(null);
        }
      });
    }
  }

  public hasValidationError(control: string, error: string): boolean {
    return this.contactForm.controls[control].hasError(error);
  }

}
