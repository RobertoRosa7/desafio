import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Status} from "../../pages/home/home.component";
import {Cards} from "../../interfaces/cards";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() public todo!: Cards;
  @Input() public status!: Status;

  @Output() updateEvent = new EventEmitter();
  @Output() removeEvent = new EventEmitter();
  public isEdit: boolean = false;

  formGroup: FormGroup = this.formBuilder.group({
    title: [{value: '', disabled: true}],
    description: [{value: '', disabled: true}]
  });

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  get setDirection(): any {
    return {
      next: (card: Cards) => this.next(card),
      prev: (card: Cards) => this.prev(card)
    }
  }

  ngOnInit(): void {
    if (this.todo) {
      this.formGroup.patchValue({
        title: this.todo.title,
        description: this.todo.description
      });
    }
  }

  onFocus(_: FocusEvent) {
    this.isEdit = !this.isEdit;
    this.setTitleDisable();
    this.setDescriptionDisable();
  }

  setDescriptionDisable(): void {
    this.isEdit
      ? this.formGroup.get('description')?.enable({onlySelf: true})
      : this.formGroup.get('description')?.disable({onlySelf: false});
  }

  setTitleDisable(): void {
    this.isEdit
      ? this.formGroup.get('title')?.enable({onlySelf: true})
      : this.formGroup.get('title')?.disable({onlySelf: false});
  }

  update(card: Cards, status: Status): void {
    this.updateEvent.emit({...card, status});
  }

  remove(card: Cards): void {
    this.removeEvent.emit(card);
  }

  updateDoing(card: Cards): void {
    this.updateEvent.emit({...card, status: "doing"});
  }

  updateDone(card: Cards): void {
    this.updateEvent.emit({...card, status: "done"});
  }

  updateTodo(card: Cards): void {
    this.updateEvent.emit({...card, status: "todo"});
  }

  next(card: Cards): void {
    if (card.status === 'todo') {
      this.updateDoing(card);
    } else if (card.status === 'doing') {
      this.updateDone(card);
    }
  }

  prev(card: Cards): void {
    if (card.status === 'done') {
      this.updateDoing(card);
    } else if (card.status === 'doing') {
      this.updateTodo(card);
    }
  }

  direction(direction: string, card: Cards) {
    this.setDirection[direction](card);
  }

  onChange() {
    const payload: Cards = {
      status: this.todo.status,
      title: this.formGroup.get('title')?.value,
      description: this.formGroup.get('description')?.value,
      id: this.todo.id,
      created_at: new Date().toISOString()
    }
    this.updateEvent.emit(payload);
  }
}
