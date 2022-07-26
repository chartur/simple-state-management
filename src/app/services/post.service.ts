import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import endpoints from '../../environments/endpoints';
import { interval, Observable, switchMap, take } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  public getPosts(): Observable<Post[]> {
    return interval(2000).pipe(
      take(1),
      switchMap(() => this.http.get<Post[]>(endpoints.getAllPosts))
    );
  }
}
