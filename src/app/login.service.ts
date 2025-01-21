import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
// what is need of Obeservable?

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'https://1f43-103-133-59-42.ngrok-free.app/login'; 
  // url for my server ngrok server and /login is the only path to handle

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post<any>(this.apiUrl, credentials); 
    // Send POST request with login credentials to ngrok server
  }
}
