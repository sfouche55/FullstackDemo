import { ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
 
export class GlobalErrorHandlerService implements ErrorHandler {

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
    // TODO: show snackbar instead of alert message
    //this.snackBar.open(errorMessage, "OK", { duration: 5000 });
    window.alert(errorMessage);
  }
 
}