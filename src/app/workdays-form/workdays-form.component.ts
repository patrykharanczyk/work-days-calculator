import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { WorkPeriod } from "./workPeriod";
import * as moment from "moment";

@Component({
  selector: 'app-workdays-form',
  templateUrl: './workdays-form.component.html',
  styleUrls: ['./workdays-form.component.css'],
})
export class WorkdaysFormComponent {
  createItem = (): FormGroup => {
    return this.fb.group({
      dateFrom: moment(new Date()), 
      dateTo: moment(new Date())
    });
  }
  workDaySum:number=0;
  fromMinDaySum:number=0;
  workDaysForm = this.fb.group({
    minDate: moment(new Date().valueOf()-(365*24*60*60*1000)),
    maxWorkDays: 180,
    workDates: this.fb.array([this.createItem()])
  });

  constructor(private fb: FormBuilder) { }

  getWorkDates = ():FormArray=>{ 
    return <FormArray>this.workDaysForm.get('workDates'); 
  }

  calculateWorkDaySum = () => {
    let workDaySum:number=0;
    let workPeriods = this.workDaysForm.get('workDates').value;
    let fromMinDaySum:number=0

    for (let period of workPeriods) {
      // if(workPeriods.indexOf(period)==workPeriods.length-1) continue;
      workDaySum += this.getPeriod(period.dateFrom, period.dateTo);
      fromMinDaySum += this.getPeriodInRange(period.dateFrom, period.dateTo);
      alert(workDaySum + ' ' +fromMinDaySum);
      
    }
    this.workDaySum=workDaySum;
    this.fromMinDaySum=fromMinDaySum;
  }

  lastDateEntered(event) {
    let dates = this.workDaysForm.get('workDates') as FormArray;
    dates.push(this.createItem());
  }

  getMin = (date1: Date, date2: Date): Date => {
    // if(date1==null) return date2;
    // if(date2==null) return date1;
    if (date1.valueOf < date2.valueOf) {
      return date1;
    }
    return date2;
  }

  getPeriod = (dateFrom: Date, dateTo: Date): number => {
    if (dateFrom && dateTo) {
      var duration = dateTo.valueOf() - dateFrom.valueOf();
      return Math.ceil(duration / 1000 / 60 / 60 / 24)+1;
    } else {
      return 0;
    }
  }
  
  getPeriodInRange = (dateFrom:Date, dateTo:Date):number =>{
    let minDate = this.workDaysForm.get('minDate').value;
    let fromMinDaySum:number=0;
    if (this.isInRange(dateTo, minDate)) {
      dateFrom = this.trimToMinDate(dateFrom, minDate);
      fromMinDaySum += this.getPeriod(dateFrom, dateTo);
    }
    return fromMinDaySum;
  }
  
  getPeriodFromMin = (dateFrom: Date, dateTo:Date):number =>{
    let minDate = this.workDaysForm.get('minDate').value;
    if (this.isInRange(dateTo, minDate)) {
      dateFrom = this.trimToMinDate(dateFrom, minDate);
      return this.getPeriod(dateFrom, dateTo);
    }else{
      return 0;
    }
  }

  trimToMinDate = (dateFrom: Date, minDate: Date): Date => {
    if (dateFrom.valueOf() < minDate.valueOf()) {
      dateFrom = minDate;
    }
    return dateFrom;
  }

  isInRange = (dateTo: Date, minDate: Date): boolean => {
    if (dateTo.valueOf() < minDate.valueOf()) return false;
    else return true;
  }
}
