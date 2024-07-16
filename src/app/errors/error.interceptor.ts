import { HttpInterceptor,HttpErrorResponse,HttpRequest,HttpHandler,HttpEvent} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError } from "rxjs";
import { Observable } from "rxjs";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(

      catchError( (err: HttpErrorResponse) =>  {
//         if (err) {
//           switch (err.status) {
//             case 400:
//               ...
//               break;
//             case 401:
//               ...
//               break;
//             ...
//             default:
//               ... 
//               break;
//           }
//           ... 
//           throw err;
//   ...
        throw err;
  }))
}
}