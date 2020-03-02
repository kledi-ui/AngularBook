import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportingDashboardComponent } from './components/reporting-dashboard/reporting-dashboard.component';
import { DataTablesModule } from 'angular-datatables';
import {AppRoutingModule} from '../app-routing.module';
import { CreatereportComponent } from './pages/createreport/createreport.component'
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { UpdatereportComponent } from './pages/updatereport/updatereport.component';
import { DeletereportComponent } from './components/modal/deletereport/deletereport.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReportItemComponent } from './pages/report-item/report-item.component';
import { ChartsModule } from 'ng2-charts';
import { BarchartComponent } from './components/barchart/barchart.component';


@NgModule({
  declarations: [ReportingDashboardComponent, CreatereportComponent, UpdatereportComponent, DeletereportComponent, ReportItemComponent, BarchartComponent],
  imports: [
    BrowserModule,
    CommonModule,
    DataTablesModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ChartsModule
  ],
  exports:[ReportingDashboardComponent]
})
export class BookReportingModule { }
