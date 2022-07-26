import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';
import { delay, map, Observable } from 'rxjs';
import { PostsStore } from '../../store/posts.store';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  public post$: Observable<Post>;

  constructor(private postsStore: PostsStore, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.post$ = this.postsStore.posts$.pipe(
        delay(2000),
        map((posts) => posts.find((p) => p.id === +params['postId']))
      );
    });
  }
}
