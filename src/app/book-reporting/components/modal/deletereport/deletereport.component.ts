import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ReportService} from '../../../../services/report.service'
import { IRaport } from 'src/app/book-reporting/models/raports';


@Component({
  selector: 'app-deletereport',
  templateUrl: './deletereport.component.html',
  styleUrls: ['./deletereport.component.css']
})
export class DeletereportComponent implements OnInit {
  
  @Input() report:IRaport;
  @Output() filteredArray: EventEmitter<any> = new EventEmitter();


  constructor(private reportService:ReportService,config: NgbModalConfig, private modalService: NgbModal) { 
      // customize default values of modals used by this component tree
      config.backdrop = 'static';
      config.keyboard = false;
  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
  }

  onDelete(){
    const array = this.reportService.deleteOneReport(this.report);
    this.filteredArray.emit(array);
    this.modalService.dismissAll();
    
  }

}
