import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';


@Component({
  selector: 'app-createreport',
  templateUrl: './createreport.component.html',
  styleUrls: ['./createreport.component.css']
})
export class CreatereportComponent implements OnInit {
  // values from input fields
  title = new FormControl('', [Validators.required])
  description = new FormControl('', [Validators.required])
  category = new FormControl('', [Validators.required])

  // filter section
  initFields = ['Autori', 'Data publikimi', 'Titulli', 'Pershkrimi', 'Katergoria'];
  filteredInitFields = [];
  filteredSelectedFields = [];
  selectedFields = [];

  _listFilter: string;

  createForm: FormGroup = this.builder.group({
    title: this.title,
    description: this.description,
    category: this.category
  });

  constructor(private builder: FormBuilder, private reportService: ReportService) { }

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

  submitReport(): void {

    // Generate Random Unique ID
    let id = '_' + Math.random().toString(36).substr(2, 9);

    // construct new book object

    let newReport = {}

    if (this.createForm.value.category === 'Table') {

      newReport = {
        id: id,
        reportTitle: this.createForm.value.title,
        reportDescription: this.createForm.value.description,
        reportCategory: this.createForm.value.category,
        selectedFields: this.selectedFields
      }
    } else {
      newReport = {
        id: id,
        reportTitle: this.createForm.value.title,
        reportDescription: this.createForm.value.description,
        reportCategory: this.createForm.value.category,
        selectedFields: this.selectedFields
      }
    }
    // Send object to service for subbmit
    this.reportService.addReport(newReport);
  }

  goHome(): void {
    this.reportService.goHome();
  }

}
