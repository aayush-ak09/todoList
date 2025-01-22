import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../todo';

@Component({
  standalone: true,
  selector: 'app-add-todo',
  imports: [FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent implements OnInit {
  title: string = '';
  discr: string = '';
  startTime: string = '';
  endTime: string = '';
  date: string = '';

  @Input() editTodo!: Todo;
  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();
  @Output() todoEdit: EventEmitter<Todo> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    // if (this.editTodo) {
    //   this.title = this.editTodo.title;
    //   this.discr = this.editTodo.discr;
    //   this.startTime = this.editTodo.startTime;
    //   this.endTime = this.editTodo.endTime;
    //   this.date = this.editTodo.date;
    // }
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editTodo'] && changes['editTodo'].currentValue) {
      this.populateFields(changes['editTodo'].currentValue);
    } else {
      this.clearFields();
    }
  }

  private populateFields(todo: Todo): void {
    this.title = todo.title;
    this.discr = todo.discr;
    this.startTime = todo.startTime;
    this.endTime = todo.endTime;
    this.date = todo.date;
  }

  private clearFields(): void {
    this.title = '';
    this.discr = '';
    this.startTime = '';
    this.endTime = '';
    this.date = '';
  }
  

  onSubmit(): void {
    
    if (this.editTodo) {
      const updatedTodo = {
        ...this.editTodo,
        title: this.title,
        discr: this.discr,
        startTime: this.startTime,
        endTime: this.endTime,
        date: this.date
      };
      this.todoEdit.emit(updatedTodo);
    } else {
      const newTodo = {
        sno: Math.floor(Math.random() * 100),
        title: this.title,
        discr: this.discr,
        active: true,
        startTime: this.startTime,
        endTime: this.endTime,
        date: this.date
      };
      this.todoAdd.emit(newTodo);
    }
  }
}
