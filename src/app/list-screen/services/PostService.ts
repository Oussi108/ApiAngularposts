import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostItem } from '../models/postItem'; 
import { map } from 'rxjs/operators';
import { CommentItem } from '../models/CommentItem';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostItem[]> {
    return this.http.get<PostItem[]>(this.apiUrl).pipe(
      map(posts => {
        // Calculate word count for each post
        return posts.map(post => ({
          ...post,
          wordCount: post.body.split(/\s+/).length // Count words using whitespace as delimiter
        }));
      })
    );
  }

  searchPosts(query: string): Observable<PostItem[]> {
    return this.http.get<PostItem[]>(`${this.apiUrl}?userId=${query}`);
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${postId}`);
  }
  
  getPost(id: number): Observable<PostItem | undefined> {
    return this.getPosts().pipe(
      map(posts => posts.find(post => post.id === id))
    );
  }
  getComments(postId: number): Observable<CommentItem[]> {
    const url = `${this.apiUrl}/${postId}/comments`;
    return this.http.get<CommentItem[]>(url);
  }
}
