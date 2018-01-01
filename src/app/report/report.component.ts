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
  calorieChartData: any = [1,2,3];
  calorieChartLabels: string[] = ['Fat', 'Protein', 'Carbs'];
  gramChartData: any = [1,2,3,4];
  gramChartLabels: string[] = ['Fat', 'Protein', 'Carbs', 'Fiber'];

  constructor(private bmrService: BmrService) { }

  ngOnInit() { }

  public generate() {
    if(this.validateBasicInfo()) {
      this.bmr = this.bmrService.calculateBmr(this.basicInfo, this.advancedInfo);
      this.calories = this.bmr + this.bmrService.getGoal(this.advancedInfo);

      this.calorieChartData = this.bmrService.getDataByCalory(this.bmr, this.basicInfo, this.advancedInfo);
      let pers1 = this.precentagize(this.calorieChartData);
      this.calorieChartLabels[0] += ": " + this.calorieChartData[0] + "(" + pers1[0] + ")";
      this.calorieChartLabels[1] += ": " + this.calorieChartData[1] + "(" + pers1[1] + ")";;
      this.calorieChartLabels[2] += ": " + this.calorieChartData[2] + "(" + pers1[2] + ")";;

      this.gramChartData = this.bmrService.getDataByFood(this.bmr, this.basicInfo, this.advancedInfo);
      let pers2 = this.precentagize(this.gramChartData);
      this.gramChartLabels[0] += ": " + this.gramChartData[0] + "(" + pers2[0] + ")";
      this.gramChartLabels[1] += ": " + this.gramChartData[1] + "(" + pers2[1] + ")";;
      this.gramChartLabels[2] += ": " + this.gramChartData[2] + "(" + pers2[2] + ")";;
      this.gramChartLabels[3] += ": " + this.gramChartData[3] + "(" + pers2[3] + ")";;
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
    doc.text(80, 50, "Height(CM): " + this.basicInfo.height);
    doc.text(130, 50, "Weight(KG): " + this.basicInfo.weight);
    
    doc.setFontSize(16);
    doc.text(20, 70, "Current State")
    doc.line(10, 73, 200, 73);
    
    doc.setFontSize(14);
    doc.text(50, 80, "Your BMR (Basal Metabolic Rate) is " + this.bmr + " by Calories.");
    doc.text(40, 90, "To achieve your target, you need "+ this.calories +" Calories per day! ")

    doc.setFontSize(16);
    doc.text(20, 100, "Target State")
    doc.line(10, 103, 200, 103);

    let p1 = html2canvas(this.canvas1Ref.nativeElement);
    let p2 = html2canvas(this.canvas2Ref.nativeElement);
    return Promise.all([p1, p2]).then((result) => {
      let info1 = result[0].toDataURL("image/png");
      doc.setFontSize(14);
      doc.text(40, 110, "Breakdown of source (Fat, carbs and proteins) by Calories:")
      doc.addImage(info1, 'JPEG', -10, 125, 240, 120); //the -150 is a hack
      
      
      doc.addPage();
      doc.setFontSize(14);
      doc.text(40, 10, "Breakdown of types of food (fat, carbs, protein, and fiber) by Grams:")
      let result1 = result[1].toDataURL("image/png");
      doc.addImage(result1, 'JPEG', -10, 25, 240, 120);

      return doc;
    })
  }

  private precentagize(nums: number[]) {
    let total = nums.reduce((a, b) => a + b, 0);

    return nums.map((c) => (c/total * 100).toFixed(2) + "%")
  }
}
