import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }
  @Output() search = new EventEmitter();
  searchForm: FormGroup;

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['', [Validators.minLength(3), Validators.maxLength(20)]]
    })
  }

  searchProduct() {
    let searchTerm =this.searchForm.controls.search.value;
    this.search.emit(searchTerm);
  }

}
