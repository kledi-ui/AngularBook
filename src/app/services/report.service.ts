import { Injectable } from '@angular/core';
import { IRaport } from '../book-reporting/models/raports';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private router: Router) { }

  getAllReports():IRaport[]{
      // if local storage is null set local storage and return empty array
      if (JSON.parse(localStorage.getItem("Reports")) === null) {
        localStorage.setItem("Reports", JSON.stringify([]));
        return [];
      } else {
        return JSON.parse(localStorage.getItem("Reports"));
      }
  }
  addReport(newReport){
    // First we check for local storage items
    if (JSON.parse(localStorage.getItem("Reports")) === null) {
      localStorage.setItem("Reports", JSON.stringify([]));
    } else {
      let reports = [];
      reports = JSON.parse(localStorage.getItem("Reports"));

      // Insert new book to local storage 
      reports.push(newReport);
      localStorage.setItem("Reports", JSON.stringify(reports));
      // Route back to home page
      this.router.navigateByUrl('/reporting');
    }

  }
  goHome(){
    this.router.navigateByUrl('/reporting');
  }
  updateReport(updatedReport){
    let reports = [];
    reports = JSON.parse(localStorage.getItem("Reports"));
    // find index of the current book 
    let index = reports.findIndex(item => item.id === updatedReport.id)
    reports.splice(index, 1, updatedReport)
    // update local storage
    localStorage.setItem("Reports", JSON.stringify(reports));
    // route back to home page
    this.router.navigateByUrl('/reporting');
  }

  deleteOneReport(report:IRaport):IRaport[]{
    let reports = [];
    reports = JSON.parse(localStorage.getItem("Reports"));
    // filter through books and return all elements not equa to book
    const filterdReports = reports.filter(element => {
      return element.id !== report.id
    });
    return filterdReports;

  }

}
