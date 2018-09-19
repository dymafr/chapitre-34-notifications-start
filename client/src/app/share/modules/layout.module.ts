import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';

const MODULE = [
  FlexLayoutModule,
  MaterialModule,
  CommonModule
];

@NgModule({
  imports: MODULE,
  exports: MODULE
})
export class LayoutModule { }
