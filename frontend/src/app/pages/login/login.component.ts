import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as actionLogin from "../../actions/action.login";
import * as selectorLogin from '../../selectors/selector.login';
import {filter, Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public changeTexts = true;
  public isLoadingLocal: boolean = false;
  public error$!: Observable<any>;
  public success$!: Observable<any>;
  public unsubscription!: Subscription;
  public formLogin: FormGroup = this.formBuilder.group({
    login: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(this.regexPassword())]]
  })

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.unsubscription.unsubscribe();
  }

  login() {
    this.store.dispatch(actionLogin.login(this.formLogin.value));
    this.error$ = this.store.select(selectorLogin.selectError);
    this.success$ = this.store.select(selectorLogin.selectSuccess);

    this.unsubscription = this.success$.subscribe({
      next: (token) => {
        if (token) {
          this.router.navigateByUrl("/home").then();
        }
      }
    })
  }

  public regexPassword(): RegExp {
    // (?=.*[A-Z]) caso precise usar caracteres maiúsculos
    return /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
  }
}
