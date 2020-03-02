import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ReportService } from '../../../services/report.service'
import {BookServiceService} from '../../../services/book-service.service'
import { IBook } from 'src/app/models/book';

@Component({
  selector: 'app-report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.css']
})
export class ReportItemComponent implements OnInit {

  title: string;
  description: string;
  category:string;
  selectedFields: [];
  listOfBook:IBook[];

  @ViewChild(DataTableDirective, { static: false })
  dataElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<ReportItemComponent> = new Subject();

  constructor(private route: ActivatedRoute, private reportService: ReportService,private bookService:BookServiceService) {

  }

  ngOnInit(): void {
    // get the id from route 
    const id = this.route.snapshot.paramMap.get('id');
    let reports = [];
    reports = JSON.parse(localStorage.getItem("Reports"));

    const found = reports.find(report =>
      report.id === id
    );

    this.title = found.reportTitle;
    this.description = found.reportDescription;
    this.selectedFields = found.selectedFields;
    this.category=found.reportCategory;

    this.dtOptions = {
      pagingType: "full_numbers",
      lengthMenu: [10, 20, 30],
    };

    // Get full list of Books

    this.listOfBook=this.bookService.getAllBooks();

  }

  goHome(): void {
    this.reportService.goHome();
  }
}
