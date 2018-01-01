import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Step1Form } from './model/step1Form';
import { Step2Form } from './model/step2Form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Diet Helper';
  isStarted: boolean = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  step1Form: Step1Form = {
    fullName: '',
    email: '',
    gender: null,
    age: null,
    height: null,
    weight: null
  };

  step2Form: Step2Form = {
    level: null,
    goal: null
  };

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.required],
      genderCtrl: [null, Validators.required],
      ageCtrl: [null, Validators.min(10)],
      heightCtrl: [null, Validators.required],
      weightCtrl: [null, Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      levelCtrl: ['', Validators.required],
      goalCtrl: ['', Validators.required]
    });
  }
}
