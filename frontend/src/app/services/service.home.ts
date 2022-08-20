import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Constants} from "./service.constants";
import {Cards} from "../interfaces/cards";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private http: HttpClient,
    private constants: Constants,
  ) {
  }


  public create(payload: Cards): Observable<any> {
    return this.http.post(`${this.constants.get('home')}`, payload);
  }

  public read(): Observable<Cards[]> {
    return this.http.get<Cards[]>(`${this.constants.get('home')}`);
  }

  public remove(payload: Cards) {
    return this.http.delete(`${this.constants.get('home')}/${payload.id}`);
  }

  public update(payload: Cards): Observable<any> {
    return this.http.put(`${this.constants.get('home')}/${payload.id}`, payload);
  }
}
