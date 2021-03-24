import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  signup(email: string, password: string): void {
    this.httpClient.post('127.0.0.1:3000/signup', { email, password });
  }
}
