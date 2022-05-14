import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../objects/post';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http:HttpClient) { }

  public saveNewPost(postObj:any): Observable<Post> {
    return this.http.post<Post>('http://localhost:3000/posts', postObj)
  }

  public getPosts(): Observable<Post> {
    return this.http.get<Post>('http://localhost:3000/posts');
  }

  public updateLikes(postObj:any) : Observable<Post> {
    return this.http.put<Post>('http://localhost:3000/posts/' + postObj.id, postObj);
  }

  public updateComments(postObj:any): Observable<Post> {
    return this.http.put<Post>('http://localhost:3000/posts/' + postObj.id, postObj);
  }
}
