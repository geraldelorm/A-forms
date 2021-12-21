import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css'],
})
export class UserSettingsFormComponent implements OnInit {
  originalUserSettings: UserSettings = {
    name: 'Gerald',
    emailOffers: true,
    style: 'dark',
    subscriptionType: 'Annual',
    notes: 'Here are some notes',
  };

  userSettings: UserSettings = {
    ...this.originalUserSettings,
  };

  constructor() {}

  ngOnInit(): void {}
}
