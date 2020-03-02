import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableConfigurationComponent } from './components/table-configuration/table-configuration.component';
import { CreateComponent } from './components/pages/create/create.component';
import { UpdateComponent } from './components/pages/update/update.component';
import {ReportingDashboardComponent} from '../app/book-reporting/components/reporting-dashboard/reporting-dashboard.component'
import {CreatereportComponent} from './book-reporting/pages/createreport/createreport.component'
import {UpdatereportComponent} from './book-reporting/pages/updatereport/updatereport.component'
import {ReportItemComponent} from './book-reporting/pages/report-item/report-item.component';

const routes: Routes = [
  {path:'manage',component:TableConfigurationComponent},
  {path:'create',component:CreateComponent},
  {path:'newreport',component:CreatereportComponent},
  {path:'update/:id',component:UpdateComponent},
  {path:'updatereport/:id',component:UpdatereportComponent},
  {path:'reporting',component:ReportingDashboardComponent},
  {path:'reporting/:id',component:ReportItemComponent},
  { path: '**', redirectTo: 'manage', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
