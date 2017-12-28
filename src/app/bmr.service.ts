import { Injectable } from '@angular/core';
import { Step1Form } from './model/step1Form';
import { Step2Form } from './model/step2Form';

@Injectable()
export class BmrService {
  private levels: Map<string, number> = new Map<string, number>();
  private goals: Map<string, number> = new Map<string, number>();

  constructor() {
    this.levels.set('sedentary', 1.2);
    this.levels.set('active', 1.375);
    this.levels.set('fit', 1.5);
    this.levels.set('extra', 1.725);
    this.levels.set('champion', 1.9);

    this.goals.set('lose', -500);
    this.goals.set('gain', 500);
    this.goals.set('equal', 0);
    this.goals.set('diet', 0);
  }

  public getGoal(advancedInfo: Step2Form) {
    return this.goals.get(advancedInfo.goal) || 0;
  }

  public calculate(basicInfo: Step1Form, advancedInfo: Step2Form) {
    if(basicInfo.gender == "male") {
      return this.bmrForMale(basicInfo, advancedInfo);
    }

    return this.bmrForFemale(basicInfo, advancedInfo);
  }

  private bmrForMale (basicInfo: Step1Form, advancedInfo: Step2Form) {
    let base = 66 + (13.7*basicInfo.weight) + (5*basicInfo.height) - (6.8*basicInfo.age);
    let multiplier = this.levels.get(advancedInfo.level) || 1;

    return base * multiplier;
  }

  private bmrForFemale (basicInfo: Step1Form, advancedInfo: Step2Form) {
    let base = 655 + (9.6*basicInfo.weight) + (1.8*basicInfo.height) - (4.7*basicInfo.age);

    let multiplier = this.levels.get(advancedInfo.level) || 1;

    return base * multiplier;
  }
}
