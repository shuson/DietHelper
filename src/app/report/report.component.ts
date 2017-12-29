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
  caloryChartDataSets: any = [
    {
      data: [1, 2, 3],
      label: 'current state'
    },
    {
      data: [4, 3, 2],
      label: 'target state'
    }
  ];
  caloryChartLabels: string[] = ['Fat', 'Protein', 'Carbs'];
  gramChartDataSets: any = [
    {
      data: [1, 2, 3, 4],
      label: 'current state'
    },
    {
      data: [4, 3, 2, 1],
      label: 'target state'
    }
  ];
  gramChartLabels: string[] = ['Fat', 'Protein', 'Carbs', 'Fiber'];

  constructor(private bmrService: BmrService) { }

  ngOnInit() { }

  public generate() {
    if(this.validateBasicInfo()) {
      this.bmr = this.bmrService.calculateBmr(this.basicInfo, this.advancedInfo);
      this.calories = this.bmr + this.bmrService.getGoal(this.advancedInfo);

      this.caloryChartDataSets = [
        {
          data: this.bmrService.getDataByCalory(this.bmr, this.basicInfo, this.advancedInfo),
          label: 'Current state'
        },
        {
          data: this.bmrService.getDataByCalory(this.calories, this.basicInfo, this.advancedInfo),
          label: 'Target state'
        }
      ];

      this.gramChartDataSets = [
        {
          data: this.bmrService.getDataByFood(this.bmr, this.basicInfo, this.advancedInfo),
          label: "Current state"
        },
        {
          data: this.bmrService.getDataByFood(this.calories, this.basicInfo, this.advancedInfo),
          label: "Target state"        
        }
      ];
    }
  }

  private validateBasicInfo() {
    //todo 1
    return true
  }

  public doPrint() {
    window.print();
  }
}
