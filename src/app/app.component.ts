import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  step1Form = {
    fullName: 'o',
    email: '',
    age: null,
    gender: 'female'
  }

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.required],
      ageCtrl: [null, Validators.max(70)]
    });

    this.secondFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required]
    });
  }

  public report () {
    console.log(this.step1Form);
  }
}
