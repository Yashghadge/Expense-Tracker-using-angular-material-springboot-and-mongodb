import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error, log } from 'console';

import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  balance:number=0;
  totalIncome:number=0;
  totalExpense= 0;
  // myForm!: FormGroup;
  constructor(private dashboardService:DashboardService,private fb: FormBuilder, private route:Router) {
    // this.myForm = this.fb.group({
    //   myField: ['', [Validators.required, Validators.minLength(3)]]
    // });
   }

  //  get myField() {
  //   return this.myForm.get('myField');
  // }

  ngOnInit(): void {
  this.getBalance();
  this.getTotalIncome();
  this.getTotalExpense();
  }
   
  getBalance(){
    this.dashboardService.getBalance().subscribe(
      (result)=>{ this.balance=result;
        console.log(result);
      }  
    )
  }
  getTotalIncome(){
    this.dashboardService.getTotalIncome().subscribe(
      (result)=>{ this.totalIncome=result;
        console.log(result);
      }  
    )
  }

  getTotalExpense(){
    this.dashboardService.getTotalExpense().subscribe(
      (result)=>{ this.totalExpense=result;
        console.log(result);
      } ,
      error =>console.log(error)
       
    )
  }
}
