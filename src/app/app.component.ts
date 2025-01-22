import { Component } from '@angular/core';
import { TodosComponent } from './MyComponent/todos/todos.component';
import { LoginComponent } from './MyComponent/login/login.component';
import { CommonModule } from '@angular/common';
// import { LoginComponent } from './MyComponent/login/login.component';
//  in new virsion we have to import componets here because they are not available 
// in the browser environment.

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [TodosComponent, LoginComponent, CommonModule]
})

export class AppComponent {
  title = 'todo-App';
  compDate = new Date();
  date = this.compDate.getDate();
  daysNames = ["Sun", "Mon","Tue","Wed","Thur", "Fri", "Sat"];
  day = this.daysNames[this.compDate.getDay()]
  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  month = this.monthNames[this.compDate.getMonth()];
  today = `${this.day} ${this.date}, ${this.month}`;

  showTodos = true;

  showAddTodo() {
    console.log("Add todo clicked")
    this.showLoginComponent = false;
    this.showTodos = false;
  }
  
  showTodoList() {
    console.log("show todo clicked")
    this.showLoginComponent = false;
    this.showTodos = true;
  }

  // similiarly for login 
  showLoginComponent = false;

  showlogin() {
    console.log("Login clicked")
    console.log(this.showLoginComponent);
    this.showLoginComponent = !this.showLoginComponent;
  }
}

