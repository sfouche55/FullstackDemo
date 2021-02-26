import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export class HttpErrorInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        console.log('HttpErrorInterceptorService')
        console.error(error);
        let errorMessage: string;
        if (error.error instanceof ErrorEvent) {
          errorMessage = error.error.message;
        } else {
          errorMessage = error.message;
        }
        // TODO: show snackbar instead of alert message
        //this.snackBar.open(errorMessage, "OK", { duration: 5000 });
        window.alert(errorMessage);
        return throwError(errorMessage);
      })
    )
  }

}