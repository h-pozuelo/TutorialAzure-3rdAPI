import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  // Agregando manejo de errores
  // Con el 'pipe' visualizamos lo que hay en el torrente del 'Observable' sin suscribirnos
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        if (error.status === 400) {
          Object.values(error.error.errors).map((m) => {
            errorMessage += `${m}<br />`;
          });
        } else if (error.status === 401) {
          errorMessage = error.error.errorMessage;
        } else {
          errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }
      }

      return throwError(() => errorMessage);
    })
  );
};
