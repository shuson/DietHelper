import { Component, OnInit, Input } from '@angular/core';
import { Step1Form } from '../model/step1Form';
import { Step2Form } from '../model/step2Form';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @Input() basicInfo: Step1Form;
  @Input() advancedInfo: Step2Form;

  bmr: number;

  constructor() { }

  ngOnInit() {
    if(this.basicInfo.isValid()) {
      this.bmr = 2;
    }
  }

}
