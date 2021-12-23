import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { UserSettings } from '../data/user-settings';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css'],
})
export class UserSettingsFormComponent implements OnInit {
  originalUserSettings: UserSettings = {
    name: '',
    emailOffers: true,
    style: 'dark',
    subscriptionType: 'Annual',
    notes: 'Here are some notes',
  };

  userSettings: UserSettings = {
    ...this.originalUserSettings,
  };
  postError = false;
  postErrorMessage = '';
  subscriptionTypes!: Observable<string[]>;
  singleModel = true;
  startDate!: Date;
  startTime!: Date;

  max = 10;
  rate = 7;
  isReadonly = false;

  overStar: number | undefined;
  percent = 0;

  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / this.max) * 100;
  }

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
    this.startDate = new Date();
    this.startTime = new Date();
  }

  onBlur(field: NgModel) {
    console.log('onBlur: ', field.value, field.valid);
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit(form: NgForm) {
    console.log('onSubmit: ', form.valid);
    if (form.valid) {
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        (result) => console.log('success: ', result),
        (error) => this.onHttpError(error)
      );
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please Fix all errors before submitting';
      console.log("Form wasn't submitted cos it's invalid");
    }
  }
}
