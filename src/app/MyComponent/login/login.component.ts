import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule] 
})
export class LoginComponent {
  @Output() changeView: EventEmitter<boolean> = new EventEmitter();

  username: string = '';
  password: string = '';
  mobile: string = '';
  countryCode: string = '+91';
  mobileError: string = '';

  // URL of the API we are calling (Server that handles user login)
  private apiUrl = 'https://1f43-103-133-59-42.ngrok-free.app/api/login'; 

  // Inject the HttpClient into the constructor for making API calls
  constructor(private http: HttpClient) {}

  /*
    The onSubmit function is triggered when the form is submitted.
    It first validates the mobile number input.
    Then checks if all form fields (username, password, mobile) are filled before proceeding with the API call.
   */
  onSubmit() {
    if (!this.isMobileValid()) {
      // Provide an error message if mobile number is invalid
      this.mobileError = 'Mobile number must be exactly 10 digits.';
      return;
    } else {
      this.mobileError = ''; // Clear any previous mobile number error
    }

    // If the form is complete, prepare the credentials object and make the API call
    if (this.username && this.password && this.mobile && this.countryCode) {
      // Log the input values (for debugging or development purposes)
      console.log('Form submitted successfully!');
      console.log('Username:', this.username);
      console.log('Password:', this.password);
      console.log('Mobile:', `${this.countryCode} ${this.mobile}`);

      const credentials = {
        username: this.username,
        password: this.password,
        mobile: `${this.countryCode}${this.mobile}`
      };

      /*
        Making the API call:
        The HttpClient's post method is used to send the login request to the server.
        It returns an observable which we subscribe to in order to handle the success or failure of the request.
       */
      this.http.post<any>(this.apiUrl, credentials).subscribe(
        (response) => {
          // If the API request is successful, handle the success response
          console.log('Login successful:', response);

          /*
           Emitting an event to indicate the login was successful
           Using the @Output() 'changeView' EventEmitter to notify the parent component
           You can use this event to toggle views (e.g., show dashboard)
           */
          this.changeView.emit(true); // Example: Emit success view change
        },
        (error) => {
          // If the API request fails, handle the error response
          console.error('Login failed:', error);

          /*
            Display a message to the user on failed login.
            The error can be customized based on what information is available in the API response.
           */
          alert('Login failed! Please try again.');
        }
      );
    } else {
      // If any field is empty, alert the user to fill all fields.
      alert('Please fill out all fields.');
    }
  }

  /*
    Mobile Validation:
    Basic regex validation to ensure that the mobile number consists of exactly 10 digits.
    This function is used in the onSubmit method to ensure the mobile number is formatted correctly before submitting.
   */
  isMobileValid(): boolean {
    return /^\d{10}$/.test(this.mobile);
  }
}
