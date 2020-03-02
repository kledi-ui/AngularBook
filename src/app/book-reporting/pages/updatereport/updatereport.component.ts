import { Component, OnInit, ViewChild } from "@angular/core";
import { ReportService } from "../../../services/report.service";
import { ActivatedRoute } from "@angular/router";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { FieldpickerupdateComponent } from "../../components/fieldpickerupdate/fieldpickerupdate.component";

@Component({
  selector: "app-updatereport",
  templateUrl: "./updatereport.component.html",
  styleUrls: ["./updatereport.component.css"]
})
export class UpdatereportComponent implements OnInit {
  @ViewChild("field") field: FieldpickerupdateComponent;

  // Form Group
  title = new FormControl("", [Validators.required]);
  description = new FormControl("", [Validators.required]);
  category = new FormControl("", [Validators.required]);
  id: string;

  updateForm: FormGroup = this.builder.group({
    title: this.title,
    description: this.description,
    category: this.category
  });

  constructor(
    private reportService: ReportService,
    private route: ActivatedRoute,
    private builder: FormBuilder
  ) {}

  ngOnInit(): void {
    // get the id from route
    const id = this.route.snapshot.paramMap.get("id");

    let reports = [];
    reports = JSON.parse(localStorage.getItem("Reports"));

    const found = reports.find(report => report.id === id);

    // update input forms based on found object
    this.id = id;
    this.updateForm.controls["title"].patchValue(found.reportTitle);
    this.updateForm.controls["description"].patchValue(found.reportDescription);
    this.updateForm.controls["category"].patchValue(found.reportCategory);
  }

  updateReport() {
    let updatedReport = {
      id: this.id,
      reportTitle: this.updateForm.value.title,
      reportDescription: this.updateForm.value.description,
      reportCategory: this.updateForm.value.category,
      selectedFields:
        this.updateForm.value.category === "Table"
          ? this.field.selectedFields
          : []
    };

    this.reportService.updateReport(updatedReport);
  }

  goHome(): void {
    this.reportService.goHome();
  }
}
