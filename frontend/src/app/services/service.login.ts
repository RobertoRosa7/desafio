import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Constants} from "./service.constants";
import {Login, LoginResponse} from "../interfaces/login";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isLogin$: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(
    private http: HttpClient,
    private constants: Constants,
  ) {
  }

  public createLogin(payload: Login): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(`${this.constants.get('login')}`, this.setCredentialHeaders(payload)).pipe(
      tap((user: any) => {
        if (!user.error) {
          this.setUserOnStorageAfterLogin(user);
          console.log(user);
        }
      })
    )
  }

  public isAuthenticated(): Observable<boolean> {
    if (localStorage.getItem('token')) {
      this.isLogin$.next(true);
    }
    return this.isLogin$.asObservable();
  }

  private setUserOnStorageAfterLogin(user: any): void {
    localStorage.setItem('token', user.data.token);
    this.isLogin$.next(true);
  }

  private setCredentialHeaders(payload: Login) {
    return {
      headers: {
        Credential: `${btoa(JSON.stringify(payload))}`
      }
    }
  }
}
