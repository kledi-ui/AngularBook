import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service'
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { element } from 'protractor';


@Component({
  selector: 'app-updatereport',
  templateUrl: './updatereport.component.html',
  styleUrls: ['./updatereport.component.css']
})
export class UpdatereportComponent implements OnInit {

  title = new FormControl('',[Validators.required])
  description = new FormControl('',[Validators.required])
  category = new FormControl('',[Validators.required])

   // filter section
   initFields = ['Autori', 'Data publikimi', 'Titulli', 'Pershkrimi', 'Katergoria'];
   filteredInitFields = [];
   filteredSelectedFields = [];
   selectedFields = [];
 


   performFilter(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    this.filteredInitFields = this.initFields.filter(field =>
      field.toLocaleLowerCase().indexOf(filterBy) !== -1
    )
  }

  performSelectedFilter(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    this.filteredSelectedFields = this.selectedFields.filter(field =>
      field.toLocaleLowerCase().indexOf(filterBy) !== -1
    )
  }


  id: string;

  updateForm: FormGroup = this.builder.group({
    title: this.title,
    description: this.description,
    category: this.category
  });

  constructor(private reportService:ReportService,private route: ActivatedRoute, private builder: FormBuilder) { }

  ngOnInit(): void {
     // get the id from route 
     const id = this.route.snapshot.paramMap.get('id');
    
     let reports = [];
     reports = JSON.parse(localStorage.getItem("Reports"));
 
     const found = reports.find(report =>
       report.id === id
     );
 
     // update input forms based on found object
     this.id = id;
     this.updateForm.controls['title'].patchValue(found.reportTitle);
     this.updateForm.controls['description'].patchValue(found.reportDescription);
     this.updateForm.controls['category'].patchValue(found.reportCategory);

    // filter through arrays to find the same id and return the oposite object
    

     this.filteredSelectedFields = found.selectedFields;
     this.selectedFields=found.selectedFields;
     
     let filteredArray = this.initFields.filter((array_el) => {
       if(found.selectedFields){
        return found.selectedFields.filter((anotherOne_el) => {
          return anotherOne_el == array_el;
        }).length == 0
       }
    });
    this.filteredInitFields = filteredArray;
    this.initFields=filteredArray;
   
  }
  
  updateReport() {
    let updatedReport={};
    if (this.updateForm.value.category === 'Table') {
      updatedReport = {
        id: this.id,
        reportTitle: this.updateForm.value.title,
        reportDescription: this.updateForm.value.description,
        reportCategory: this.updateForm.value.category,
        selectedFields: this.selectedFields
      }
     
    } else {
     updatedReport = {
        id: this.id,
        reportTitle: this.updateForm.value.title,
        reportDescription: this.updateForm.value.description,
        reportCategory: this.updateForm.value.category,
        selectedFields: []
      }
    }

    this.reportService.updateReport(updatedReport);
  }

  goHome(): void {
    this.reportService.goHome();
  }

  addField(field: string):void {

    // this.selectedFields.push(field);
    this.filteredSelectedFields.push(field);
    this.filteredInitFields = this.filteredInitFields.filter(field_element => {
      return field_element !== field
    })
    this.initFields = this.initFields.filter(field_element => {
      return field_element !== field
    })
    this.selectedFields=this.filteredSelectedFields;

  }


  removeField(field: string):void {
    // this.initFields.push(field);
    this.filteredInitFields.push(field);
    this.filteredSelectedFields = this.filteredSelectedFields.filter(field_element => {
      return field_element !== field
    })
    this.selectedFields = this.selectedFields.filter(field_element => {
      return field_element !== field
    })
  }




}
