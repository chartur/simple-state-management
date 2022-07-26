import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {
  @Input('items') items: Post[] = [];
  @Output('delete') onDelete: EventEmitter<Post> = new EventEmitter<Post>();

  constructor(public router: Router) {}

  public deleteItem(item: Post): void {
    this.onDelete.emit(item);
  }

  public previewItem(item: Post): void {
    this.router.navigate(['/post', item.id]);
  }
}
