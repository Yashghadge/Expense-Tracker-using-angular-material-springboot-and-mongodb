import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Income } from 'src/app/model/all.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { IncomeService } from 'src/app/services/income.service';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss']
})
export class AddIncomeComponent implements OnInit {

  horizontalPosition:MatSnackBarHorizontalPosition='right';
  verticalPosition:MatSnackBarVerticalPosition='top'

  
  incomeForm!:FormGroup;
  isSubmitting:boolean=false;

  addIncome:Income={
    id:'', 
    title :'', 
    description:'',
     amount:0,
     date:''
  }

  constructor(private dashboardService:DashboardService, private incomeService:IncomeService,
    private dialog:MatDialog,private _snackBar:MatSnackBar,private router:Router,
    private fb:FormBuilder) {
    this.incomeForm= this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      date: ['', [Validators.required]]
    })
   }

  ngOnInit(): void {
  }
   
  onValidCreateIncome(){
    if (this.incomeForm.valid) {
      this.isSubmitting=true;
      this.incomeService.addIncome(this.incomeForm.value).subscribe(
        (data) =>{
          console.log(data);
          // this.incform.reset();
          this._snackBar.open('Income added sucessfully','Close',{
            horizontalPosition:this.horizontalPosition,
            verticalPosition:this.verticalPosition,
            duration:2000,
            panelClass:['success']
           }),
           this.incomeForm.reset();
          this.incomeForm.markAsPristine()
          this.incomeForm.markAsTouched();
     
           this.isSubmitting=false;
         this.router.navigate(['income']);
        },
        error=>{
          this._snackBar.open('Error occured while adding income','Close',{
            horizontalPosition:this.horizontalPosition,
            verticalPosition:this.verticalPosition,
            duration:2500,
            panelClass:['error']
           })
        
        }
      )
    } else {
      this._snackBar.open('Please fill out the form correctly', 'Close', {
        duration: 3000
      });
    }
  }


  

}
