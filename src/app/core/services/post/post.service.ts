import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Post } from '../../../models/post.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const authToken = this.authService.getToken();
    if (authToken) {
      headers = headers.set('Authorization', 'Bearer ' + authToken);
    }
    return headers;
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  createPost(post: Post): Observable<Post> {
    const httpOptions = {
      headers: this.getHeaders()
    };
    return this.http.post<Post>(this.apiUrl, post, httpOptions);
  }

  updatePost(post: Post, id: number): Observable<Post> {
    const url = `${this.apiUrl}/${id}`;
    const httpOptions = {
      headers: this.getHeaders()
    };
    return this.http.put<Post>(url, post, httpOptions);
  }

  deletePost(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    const httpOptions = {
      headers: this.getHeaders()
    };
    return this.http.delete<void>(url, httpOptions);
  }

}
