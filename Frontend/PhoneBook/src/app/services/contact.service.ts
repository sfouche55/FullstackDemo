import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private headers: HttpHeaders;
  private accessPointUrl = "https://localhost:44306/api/Contacts";

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  public get(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.accessPointUrl, {headers: this.headers});
  }

  public add(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.accessPointUrl, contact, {headers: this.headers});
  }

  public remove(contact: Contact): Observable<Contact> {
    const event = new ErrorEvent(
      'Client Side Test Error for contact "' + contact.name + '"', {
        error : new Error('AAAHHHH'),
        message : 'A monkey is throwing bananas at me!',
        lineno : 402,
        filename : 'closet.html'
      }
    );    
    const error = new HttpErrorResponse({error: event, headers: this.headers, url: this.accessPointUrl, statusText: "testing", status: 101});
    return throwError(error);
    
    //return this.http.delete<Contact>(this.accessPointUrl + '/' + contact.id, {headers: this.headers});
  }

  public update(contact: Contact): Observable<Contact> {
    this.accessPointUrl = "https://localhost:44306/api/ContactsY";
    return this.http.put<Contact>(this.accessPointUrl + '/' + contact.id, contact, {headers: this.headers});
  }

}
