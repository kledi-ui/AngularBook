import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';
import {FieldPickerComponent} from '../../components/field-picker/field-picker.component'

@Component({
  selector: 'app-createreport',
  templateUrl: './createreport.component.html',
  styleUrls: ['./createreport.component.css']
})
export class CreatereportComponent implements  OnInit {
  // values from input fields
  title = new FormControl('', [Validators.required])
  description = new FormControl('', [Validators.required])
  category = new FormControl('', [Validators.required])

  @ViewChild('fields') fields: FieldPickerComponent ;

  createForm: FormGroup = this.builder.group({
    title: this.title,
    description: this.description,
    category: this.category
  });

  constructor(private builder: FormBuilder, private reportService: ReportService) { }

  ngOnInit(): void {

  }

  submitReport(): void {

    // Generate Random Unique ID
    let id = '_' + Math.random().toString(36).substr(2, 9);

    // construct new book object

      let newReport = {
        id: id,
        reportTitle: this.createForm.value.title,
        reportDescription: this.createForm.value.description,
        reportCategory: this.createForm.value.category,
        selectedFields: this.createForm.value.category === 'Table' ? this.fields.selectedFields : []
      }
  
    // Send object to service for subbmit
    this.reportService.addReport(newReport);
  }

  goHome(): void {
    this.reportService.goHome();
  }

}
