import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Step1Form } from '../model/step1Form';
import { Step2Form } from '../model/step2Form';

import * as _ from "underscore";
import { BmrService } from '../bmr.service';
import * as JSPdf from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @Input() basicInfo: Step1Form;
  @Input() advancedInfo: Step2Form;

  @ViewChild("canvas1") canvas1Ref: ElementRef;
  @ViewChild("canvas2") canvas2Ref: ElementRef;

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
    this.composeReport().then((doc) => {
      doc.save('report.pdf');
    })
  }

  private composeReport() {
    let doc = new JSPdf('p', 'mm', 'A4');
    doc.setFontSize(18);
		doc.text(90, 10, "Diet Report");
    
    doc.setFontSize(16);
    doc.text(20, 30, "Basic Info")
    doc.line(10, 33, 200, 33);
    
    doc.setFontSize(14);
    doc.text(30, 40, "Name: " + this.basicInfo.fullName);
    doc.text(80, 40, "Email: " + this.basicInfo.email);
    doc.text(130, 40, "Gender: " + this.basicInfo.gender);
    doc.text(30, 50, "Age: " + this.basicInfo.age);
    doc.text(80, 50, "Height: " + this.basicInfo.height);
    doc.text(130, 50, "Weight: " + this.basicInfo.weight);
    
    doc.setFontSize(16);
    doc.text(20, 70, "Basic Result")
    doc.line(10, 73, 200, 73);
    
    doc.setFontSize(14);
    doc.text(50, 80, "Your BMR (Basal Metabolic Rate) is " + this.bmr + " by Calories.");
    doc.text(40, 90, "To achieve your target, you need "+ this.calories +" Calories per day! ")

    doc.line(10, 100, 200, 100);
    let p1 = html2canvas(this.canvas1Ref.nativeElement);
    let p2 = html2canvas(this.canvas2Ref.nativeElement);
    return Promise.all([p1, p2]).then((result) => {
      let info1 = result[0].toDataURL("image/png");
      doc.text(40, 105, "Breakdown of source (Fat, carbs and proteins) by Calories:")
      doc.addImage(info1, 'JPEG', -110, 110); //the -150 is a hack
      
      doc.addPage();
      doc.text(40, 10, "Breakdown of types of food (fat, carbs, protein, and fiber) by Grams:")
      let result1 = result[1].toDataURL("image/png");
      doc.addImage(result1, 'JPEG', -110, 20);

      return doc;
    })
  }
}
