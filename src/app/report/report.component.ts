import { Component, OnInit, Input } from '@angular/core';
import { Step1Form } from '../model/step1Form';
import { Step2Form } from '../model/step2Form';

import * as _ from "underscore";
import { BmrService } from '../bmr.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @Input() basicInfo: Step1Form;
  @Input() advancedInfo: Step2Form;

  bmr: number;
  calories: number;

  constructor(private bmrService: BmrService) { }

  ngOnInit() {
    if(this.validateBasicInfo()) {
      this.bmr = this.bmrService.calculate(this.basicInfo, this.advancedInfo);
      this.calories = this.bmr + this.bmrService.getGoal(this.advancedInfo);
    }
  }

  private validateBasicInfo() {
    //todo 1
    return true
  }
}
