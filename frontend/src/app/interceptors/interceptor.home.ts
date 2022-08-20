import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class HomeInterceptor implements HttpInterceptor {
  private token!: string | null;

  constructor() {
  }

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem("token");

    if (this.token) {
      request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + this.token)});
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
    }

    request = request.clone({headers: request.headers.set('Accept', 'application/json')});

    return next.handle(request);
  }
}
