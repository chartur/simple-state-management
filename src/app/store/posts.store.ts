import { Post } from '../models/post';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, tap } from 'rxjs';
import { PostService } from '../services/post.service';

export interface PostsState {
  posts: Post[];
  filteredPosts: Post[];
  loading: boolean;
}

const initialState: PostsState = {
  posts: [],
  filteredPosts: [],
  loading: true,
};

@Injectable({
  providedIn: 'root',
})
export class PostsStore extends ComponentStore<PostsState> {
  constructor(private postsService: PostService) {
    super(initialState);

    this.fetchPosts();
  }

  readonly posts$: Observable<Post[]> = this.select((state) => state.posts);

  readonly filteredPosts$: Observable<Post[]> = this.select(
    (state) => state.filteredPosts
  );

  readonly loading$: Observable<boolean> = this.select(
    (state) => state.loading
  );

  readonly savePosts = this.updater((state: PostsState, posts: Post[]) => ({
    ...state,
    posts: [...posts],
    filteredPosts: [...posts],
  }));

  readonly filter = this.updater((state: PostsState, search: string) => ({
    ...state,
    filteredPosts: state.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  readonly toggleLoadingState = this.updater(
    (state: PostsState, loading: boolean) => ({
      ...state,
      loading,
    })
  );

  readonly resetSearch = this.updater((state: PostsState) => ({
    ...state,
    filteredPosts: [...state.posts],
  }));

  readonly deletePost = this.updater((state: PostsState, postId: number) => ({
    ...state,
    posts: state.posts.filter((p) => p.id !== postId),
    filteredPosts: state.filteredPosts.filter((p) => p.id !== postId),
  }));

  private fetchPosts = this.effect(() => {
    return this.postsService.getPosts().pipe(
      tap((posts) => this.savePosts(posts)),
      tap(() => this.toggleLoadingState(false))
    );
  });
}
