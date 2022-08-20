import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Store} from "@ngrx/store";
import * as actionsHome from "../../actions/action.home";
import * as selectorHome from '../../selectors/selector.home';
import {Cards} from "../../interfaces/cards";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";

export type Status = "new" | "todo" | "doing" | "done"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {
  public formGroup: FormGroup = this.formBuilder.group({
    title: [],
    description: [],
    status: ["todo"],
    created_at: [new Date().toISOString()]
  });

  public todoList$!: Observable<any>;
  public doingList$!: Observable<Cards[]>;
  public doneList$!: Observable<Cards[]>;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
  }


  ngOnInit(): void {
    this.store.dispatch(actionsHome.homeRead());
    this.todoList$ = this.store.select(selectorHome.selectTodoList);
    this.doingList$ = this.store.select(selectorHome.selectDoingList);
    this.doneList$ = this.store.select(selectorHome.selectDoneList);
  }

  onUpdate(payload: Cards) {
    this.store.dispatch(actionsHome.homeUpdate({payload}));
  }

  create() {
    this.store.dispatch(actionsHome.homeCreate(this.formGroup.value));
  }

  onRemove(payload: Cards) {
    this.store.dispatch(actionsHome.homeDelete({payload}));
  }
}
