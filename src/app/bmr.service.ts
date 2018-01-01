import { Injectable } from '@angular/core';
import { Step1Form } from './model/step1Form';
import { Step2Form } from './model/step2Form';

@Injectable()
export class BmrService {
  private levels: Map<string, number> = new Map<string, number>();
  private goals: Map<string, number> = new Map<string, number>();
  private proteinNormal: Map<string, number> = new Map<string, number>();
  private proteinDiet: Map<string, number> = new Map<string, number>();

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

    this.proteinNormal.set('sedentary', 0.8);
    this.proteinNormal.set('active', 1);
    this.proteinNormal.set('fit', 1.1);
    this.proteinNormal.set('extra', 1.3);
    this.proteinNormal.set('champion', 1.5);

    this.proteinDiet.set('sedentary', 0.96);
    this.proteinDiet.set('active', 1.2);
    this.proteinDiet.set('fit', 1.32);
    this.proteinDiet.set('extra', 1.43);
    this.proteinDiet.set('champion', 1.5);
  }

  public getGoal(advancedInfo: Step2Form) {
    return this.goals.get(advancedInfo.goal) || 0;
  }

  public calculateBmr(basicInfo: Step1Form, advancedInfo: Step2Form) {
    if(basicInfo.gender == "male") {
      return this.bmrForMale(basicInfo, advancedInfo);
    }

    return this.bmrForFemale(basicInfo, advancedInfo);
  }

  private bmrForMale (basicInfo: Step1Form, advancedInfo: Step2Form) {
    let base = 66 + (13.7*basicInfo.weight) + (5*basicInfo.height) - (6.8*basicInfo.age);
    let multiplier = this.levels.get(advancedInfo.level) || 1;

    return Math.floor(base * multiplier);
  }

  private bmrForFemale (basicInfo: Step1Form, advancedInfo: Step2Form) {
    let base = 655 + (9.6*basicInfo.weight) + (1.8*basicInfo.height) - (4.7*basicInfo.age);

    let multiplier = this.levels.get(advancedInfo.level) || 1;

    return Math.floor(base * multiplier);
  }

  public getDataByCalory(calories: number, basicInfo: Step1Form, advancedInfo: Step2Form) {
    let fatGrams = this.getFatGrams(calories);
    let proteinGrams = this.getProteinGrams(basicInfo, advancedInfo);

    let fatCalories = Math.floor(fatGrams * 9);
    let proteinCalories = Math.floor(proteinGrams * 4);
    let carbsCalories = Math.floor(calories - fatCalories - proteinCalories);

    return [fatCalories, proteinCalories, carbsCalories];
  }

  public getDataByFood(calories: number, basicInfo: Step1Form, advancedInfo: Step2Form) {
    let fatGrams = this.getFatGrams(calories);
    let proteinGrams = this.getProteinGrams(basicInfo, advancedInfo);

    let fatCalories = Math.floor(fatGrams * 9);
    let proteinCalories = Math.floor(proteinGrams * 4);
    let carbsCalories = calories - fatCalories - proteinCalories;

    let carbsGrams = Math.floor(this.getCarbsGrams(carbsCalories));
    let fiberGrams = this.getFiberGrams();

    return [fatGrams, proteinGrams, carbsGrams, fiberGrams];
  }

  private getFatGrams(calories: number) {
    let base = 53;
    return Math.floor(base + ((calories - 1600) / 400 * 8));
  }

  private getProteinGrams(basicInfo: Step1Form, advancedInfo: Step2Form) {
    let weight = basicInfo.weight;
    let level = advancedInfo.level;
    if(advancedInfo.goal == 'diet') {
      return weight * this.proteinDiet.get(level);
    }

    return weight * this.proteinNormal.get(level);
  }

  private getCarbsGrams(calories: number) {
    return Math.floor(calories / 4);
  }

  private getFiberGrams() {
    return 26;
  }
}
