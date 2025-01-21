import { Component, OnInit, Inject, PLATFORM_ID, Input } from '@angular/core';
import { Todo } from '../../todo';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  imports: [CommonModule, TodoItemComponent, AddTodoComponent, FormsModule],
})
export class TodosComponent implements OnInit {
  /*  
  // The ngOnInit lifecycle hook is called after Angular initializes the component's 
     data-bound properties.
   */
  ngOnInit(): void {
    this.filterTodaysTodos();
  }
  todos: Todo[] = [];
  @Input() showTodos: boolean = true;


  /* Here, we're injecting the PLATFORM_ID to determine whether the code 
  is running in a browser or a server environment.
  */
  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        this.todos = JSON.parse(storedTodos);
      }
    }
  }



  // filter out todos on the basis of Today's Daet
  compDate = new Date();
  date = this.compDate.getDate().toString().padStart(2, '0');
  month = (this.compDate.getMonth() + 1).toString().padStart(2, '0');
  year = this.compDate.getFullYear();
  today = `${this.year}-${this.month}-${this.date}`;

  filterTodaysTodos() {
    if (isPlatformBrowser(this.platformId)) {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        this.todos = JSON.parse(storedTodos);
      }
    }
  
    console.log("Filtering Todos...");
    console.log(this.today);
    this.todos = this.todos.filter(todo => todo.date === this.today);
  }
  




  /*
    Deletes a todo from the list and updates localStorage.
    
    event - This is the Todo object emitted by the child component (TodoItemComponent).
    The child component emits this event when the user triggers a delete action.
    
    Explanation of EventEmitter:
    - `EventEmitter` is used to create custom events that a child component can emit.
    - In the `TodoItemComponent`, we use `@Output()` to create an `EventEmitter` instance called `todoDelete`.
    - When the child emits this event (via `this.todoDelete.emit(todo)`), the parent component (`TodosComponent`) listens to it and executes the `deleteTodo()` method.
    
    Steps:
    1. The child emits the todoDelete event with the todo object.
    2. This method (deleteTodo) is triggered with the emitted todo as the `event` parameter.
    3. The todo is located in the todos array and removed.
    4. The updated list is saved back to localStorage.
   */
  deleteTodo(event: Todo): void {
    console.log("Event caught:", event);

    const index = this.todos.indexOf(event);
    if (index > -1) {
      this.todos.splice(index, 1);
      this.updateLocalStorage();
    }
  }

  /*
    Adds a new todo to the list and updates localStorage. 
    parmeter event - This is the Todo object emitted by the AddTodoComponen.
    When the user submits a new todo, the child component emits this event, and this method is triggered.
   */
  addTodo(event: Todo): void {
    this.showTodos = true;
    console.log("Todo added:", event);
    this.todos.push(event);
    this.updateLocalStorage();
  }

  toggleactive(event: Todo) {
    console.log('markasDoen Catched');
    const index = this.todos.indexOf(event);
    this.todos[index].active = !this.todos[index].active;
    this.updateLocalStorage();
  }
  /*
    Updates the localStorage with the latest todos array.
    
    This method ensures that the changes made to the todos list (like adding or deleting a todo) 
    are saved persistently in the browser's localStorage.
   */
  updateLocalStorage(): void {
    // Check if we're running in the browser before accessing localStorage. 
    // QueA: why there is need to check the platform? 
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    this.filterTodaysTodos();
  }
}
