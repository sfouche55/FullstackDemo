import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './notification.service'
 
@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(
    private notifications: NotificationService) 
  { }

  handleError(error: Error | HttpErrorResponse) {
    console.log('GlobalErrorHandlerService')
    console.error(error);
    let errorMessage: string;
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage = error.message;
      }
    } else {
      errorMessage = error.message;
    }
    this.notifications.showError(errorMessage);
  }
 
}