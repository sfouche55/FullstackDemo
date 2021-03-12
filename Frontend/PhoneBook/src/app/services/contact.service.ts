import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.delete<Contact>(this.accessPointUrl + '/' + contact.id, {headers: this.headers});
  }

  public update(contact: Contact): Observable<Contact> {
   return this.http.put<Contact>(this.accessPointUrl + '/' + contact.id, contact, {headers: this.headers});
  }

}
