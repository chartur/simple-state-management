import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [SearchBoxComponent, ItemListComponent, LoadingComponent],
  exports: [SearchBoxComponent, ItemListComponent, LoadingComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ComponentsModule {}
