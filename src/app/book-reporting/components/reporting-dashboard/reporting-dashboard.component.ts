import { Component, OnInit,ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { IRaport } from '../../models/raports';
import {ReportService} from '../../../services/report.service'

@Component({
  selector: 'app-reporting-dashboard',
  templateUrl: './reporting-dashboard.component.html',
  styleUrls: ['./reporting-dashboard.component.css']
})
export class ReportingDashboardComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dataElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<ReportingDashboardComponent> = new Subject();

  listRaports:IRaport[];

  constructor(private reportService:ReportService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      lengthMenu: [10, 20, 30],

      columnDefs: [
        {
          targets: 1,
          orderable: false
        },
        {
          targets: 3,
          orderable: false
        }
      ],
    };

    // Get data from local storage 
    this.listRaports = this.reportService.getAllReports();
  }
  
  // filtered array after deleting a single report

  filteredArray(filteredArray:IRaport[]):void{
    // set local storage with the new filtered arrays
     localStorage.setItem('Reports',JSON.stringify(filteredArray));
     this.listRaports = this.reportService.getAllReports();
   }

   // Datatable methods
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  
   // Data table rerender method when we make changes on local storage
   rerender(): void {
    this.dataElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
