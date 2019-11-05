import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }
  @Output() search = new EventEmitter();
  searchForm: FormGroup;
  

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['']
    })
  }

  searchProduct() {
    let searchTerm =this.searchForm.controls.search.value;
    this.search.emit(searchTerm);
  }

}
