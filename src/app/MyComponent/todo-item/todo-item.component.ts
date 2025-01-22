import { Component, Input, Output, EventEmitter, output } from '@angular/core';
import {Todo} from '../../todo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  imports: [CommonModule]
})
export class TodoItemComponent { 
  @Input() todo!: Todo;
  @Input() i!: number;
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();
  @Output() markasDone: EventEmitter<Todo> = new EventEmitter(); 
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter();


// fucntion for Edti 
edit(todo:Todo){
  // console.log("Edit Clicked");
  // console.log(todo);
  this.editTodo.emit(todo);
}




  // function click Delete button 
  onClick(todo: Todo){
    console.log("Onclick trigered");
    console.log(todo);
    // wait, to delete this todo we have to change the todo array, but todo is not in this component
    // so to remove this todo we have to send this request to todos.component
    // and for that we have to specify EventEmmiter
    this.todoDelete.emit(todo);
  }
  onCheckBoxClick(todo: Todo){
    // console.log(todo)
    this.markasDone.emit(todo)
  }
}
