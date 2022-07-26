import { Component } from '@angular/core';
import { PostsStore } from '../../store/posts.store';
import { Observable } from 'rxjs';
import { Post } from '../../models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public posts$: Observable<Post[]> = this.postsStore.filteredPosts$;
  public loading$: Observable<boolean> = this.postsStore.loading$;

  constructor(private postsStore: PostsStore) {}

  public onSearch(query: string): void {
    this.postsStore.filter(query);
  }

  public onReset(): void {
    this.postsStore.resetSearch();
  }

  public onPostDelete(post: Post): void {
    this.postsStore.deletePost(post.id);
  }
}
