import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { ContactModel } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private headers: HttpHeaders;
  private accessPointUrl: string = "https://localhost:44306/api/Contacts";

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  public get(): Observable<ContactModel[]> {

    // Simulate server-side error
    //this.accessPointUrl = "https://localhost:44306/api/ContactsY";

    // Simulate client-side error
    //return throwError(new Error("test error"));

    return this.http.get<ContactModel[]>(this.accessPointUrl, {headers: this.headers});
  }

  public add(contact: ContactModel): Observable<ContactModel> {
    return this.http.post<ContactModel>(this.accessPointUrl, contact, {headers: this.headers});
  }

  public remove(contact: ContactModel): Observable<ContactModel> {
    return this.http.delete<ContactModel>(this.accessPointUrl + '/' + contact.id, {headers: this.headers});
  }

  public update(contact: ContactModel): Observable<ContactModel> {
    return this.http.put<ContactModel>(this.accessPointUrl + '/' + contact.id, contact, {headers: this.headers});
  }

}
