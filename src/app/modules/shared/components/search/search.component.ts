import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(private fb: UntypedFormBuilder) {}
  @Output() search = new EventEmitter();
  searchForm: UntypedFormGroup;
  searchPattern = '^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$';

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  searchProduct() {
    let searchTerm = this.searchForm.controls.search.value;
    this.search.emit(searchTerm);
  }
}
