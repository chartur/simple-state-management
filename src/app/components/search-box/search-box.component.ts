import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  @Output('search') onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output('reset') onReset: EventEmitter<void> = new EventEmitter<void>();

  public searchForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  public get showValidationError(): boolean {
    return (
      this.searchForm.controls['query'].invalid &&
      (this.searchForm.controls['query'].dirty ||
        this.searchForm.controls['query'].touched)
    );
  }

  public submit(): void {
    this.onSearch.emit(this.searchForm.value.query);
  }

  public reset(): void {
    this.onReset.emit();
  }

  private initForm(): void {
    this.searchForm = new FormGroup({
      query: new FormControl('', [Validators.required]),
    });
  }
}
