import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-field-picker',
  templateUrl: './field-picker.component.html',
  styleUrls: ['./field-picker.component.css']
})
export class FieldPickerComponent implements OnInit {
   // filter section
   initFields = ['Autori', 'Data publikimi', 'Titulli', 'Pershkrimi', 'Katergoria'];
   filteredInitFields = [];
   filteredSelectedFields = [];
   selectedFields = [];

  constructor() { 

  }

  ngOnInit(): void {
    this.filteredInitFields = this.initFields;
    this.filteredSelectedFields = this.selectedFields;
  }

  
  // perform filter left column
  performFilter(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    this.filteredInitFields = this.initFields.filter(field =>
      field.toLocaleLowerCase().indexOf(filterBy) !== -1
    )
  }

  // perform filter right column
  performSelectedFilter(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    this.filteredSelectedFields = this.selectedFields.filter(field =>
      field.toLocaleLowerCase().indexOf(filterBy) !== -1
    )
  }

  // Add field to selected list of arrays

  addField(field: string): void {
    this.filteredSelectedFields.push(field);
    this.filteredInitFields = this.filteredInitFields.filter(field_element => {
      return field_element !== field
    })
    this.initFields = this.initFields.filter(field_element => {
      return field_element !== field
    })
    this.selectedFields = this.filteredSelectedFields;
  }

  // Remove field to selected list of arrays

  removeField(field: string): void {
    this.initFields.push(field);
    this.filteredInitFields.push(field);
    this.filteredSelectedFields = this.filteredSelectedFields.filter(field_element => {
      return field_element !== field
    })
    this.selectedFields = this.selectedFields.filter(field_element => {
      return field_element !== field
    })
  }

}
