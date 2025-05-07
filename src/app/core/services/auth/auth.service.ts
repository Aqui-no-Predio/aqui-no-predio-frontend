import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  private readonly TOKEN_STORAGE_KEY = 'auth_token';
  private readonly FIXED_USERNAME = 'manager';

  constructor(private http: HttpClient) {
    this.checkAuthOnAppLoad();
  }

  login(accessKey: string): Observable<any> {
    const loginPayload = {
      username: this.FIXED_USERNAME,
      password: accessKey
    };

    return this.http.post(`${environment.apiUrl}/auth/login`, loginPayload)
      .pipe(
        tap((response: any) => {
          if (response && response.token) {
            this.storeToken(response.token);
            this.isAuthenticatedSubject.next(true);
          } else {
            console.error('Resposta de login não contém token esperado:', response);
            this.isAuthenticatedSubject.next(false);
            throw new Error('Token não recebido.');
          }
        }),
        catchError((error) => {
          console.error('Erro de login:', error);
          this.isAuthenticatedSubject.next(false);
          throw error;
        })
      );
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_STORAGE_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_STORAGE_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_STORAGE_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  checkAuthOnAppLoad(): void {
    const token = this.getToken();
    if (token) {
      this.http.get<any>(`${environment.apiUrl}/auth/check`, { headers: this.getAuthHeaders() })
        .pipe(
          tap(() => {
            console.log('Token JWT válido ao carregar a aplicação.');
            this.isAuthenticatedSubject.next(true);
          }),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401 || error.status === 403) {
              console.warn('Token JWT inválido ou expirado ao carregar a aplicação.');
              this.logout();
            } else {
              console.error('Erro ao verificar token ao carregar aplicação:', error);
              this.isAuthenticatedSubject.next(false);
            }
            return of(null);
          })
        )
        .subscribe();
    } else {
      this.isAuthenticatedSubject.next(false);
    }
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }
}