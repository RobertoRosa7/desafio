import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Status} from "../../pages/home/home.component";
import {Cards} from "../../interfaces/cards";

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

  constructor() {
  }

  get setDirection(): any {
    return {
      next: (card: Cards) => this.next(card),
      prev: (card: Cards) => this.prev(card)
    }
  }

  ngOnInit(): void {
  }

  onFocus(_: FocusEvent) {
    this.isEdit = !this.isEdit;
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

}
