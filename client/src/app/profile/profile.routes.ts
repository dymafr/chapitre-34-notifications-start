import { Component } from '@angular/core';
import { Routes } from "@angular/router";
import { ProfileComponent } from './profile.component';


export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
];
