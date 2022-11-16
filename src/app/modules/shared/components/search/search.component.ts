import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit, OnDestroy {
  constructor(private fb: UntypedFormBuilder) { }
  @Output() search = new EventEmitter();
  searchForm: UntypedFormGroup;
  isSearching: boolean = false;
  searchValueChange$: Subscription = new Subscription();

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: [''],
    });
    this.searchValueChange$ = this.searchForm.controls.search.valueChanges.subscribe(value => {
      if(!value) {
        this.isSearching = false;
      }
    })
  }

  handleSearch() {
    this.isSearching ?
      this.cleanSearch() :
      this.searchProduct();
  }

  searchProduct() {
    const searchTerm = this.searchForm.controls.search.value.trim();
    if (searchTerm) {
      this.search.emit(searchTerm);
      this.isSearching = true;
    }
  }

  cleanSearch() {
    this.searchForm.controls.search.setValue('');
    this.isSearching = false;
  }

  ngOnDestroy(): void {
    this.searchValueChange$.unsubscribe();
  }
}
