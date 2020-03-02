import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-fieldpickerupdate',
  templateUrl: './fieldpickerupdate.component.html',
  styleUrls: ['./fieldpickerupdate.component.css']
})
export class FieldpickerupdateComponent implements OnInit {

    // filter section
    initFields = ['Autori', 'Data publikimi', 'Titulli', 'Pershkrimi', 'Katergoria'];
    filteredInitFields = [];
    filteredSelectedFields = [];
    selectedFields = [];

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
     // get the id from route 
     const id = this.route.snapshot.paramMap.get('id');
    
     let reports = [];
     reports = JSON.parse(localStorage.getItem("Reports"));
 
     const found = reports.find(report =>
       report.id === id
     );
     // filter through arrays to find the same element and return the oposite object
    
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

 addField(field: string):void {

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
 
  this.filteredInitFields.push(field);
  this.filteredSelectedFields = this.filteredSelectedFields.filter(field_element => {
    return field_element !== field
  })
  this.selectedFields = this.selectedFields.filter(field_element => {
    return field_element !== field
  })


}

}
