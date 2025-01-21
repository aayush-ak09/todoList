import { Component, OnInit,Output, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms'
import {Todo} from '../../todo';

@Component({
  standalone:true,
  selector: 'app-add-todo',
  imports: [FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent implements OnInit {
  title:string='';
  discr:string='';
  startTime:string='';
  endTime:string='';
  date:string='';
  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();

  constructor(){  }

  ngOnInit():void {}
  onSubmit(){
    console.log("Add Todo Clicked")
    const todo = {
      sno: 8,
      title: this.title,
      discr: this.discr,
      active: true,
      startTime: this.startTime,
      endTime: this.endTime,
      date:this.date

    }
    this.todoAdd.emit(todo);
  }

}
