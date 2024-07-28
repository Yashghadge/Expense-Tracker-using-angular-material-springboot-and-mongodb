import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Expense } from 'src/app/model/all.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expense-update',
  templateUrl: './expense-update.component.html',
  styleUrls: ['./expense-update.component.scss']
})
export class ExpenseUpdateComponent implements OnInit {

horizontalPosition:MatSnackBarHorizontalPosition='right';
verticalPosition:MatSnackBarVerticalPosition='top'

  constructor( private dialogRef : MatDialogRef<ExpenseUpdateComponent>  ,private route:ActivatedRoute,private dashboardServcie:DashboardService,
    private expenseService:ExpenseService,@Inject (MAT_DIALOG_DATA) public data :Expense,private _snackBar:MatSnackBar) {
     
     }

  ngOnInit(): void {
  }

  onUpdate(){
    let date = new Date(this.data.date);
     date.setDate(date.getDate() + 0);
     const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    this.data.date = `${year}-${month}-${day}`;
    this.expenseService.updateExpense(this.data.id,this.data).subscribe(
      result =>{
          setInterval(()=>{
            this.expenseService.getAllExpense().subscribe(
              total =>{ console.log(total);
              }
            )
            this.dashboardServcie.getTotalExpense().subscribe(
              total =>{ console.log(total);
              }
            )
          },2100)
          this.dialogRef.close(true);
          this._snackBar.open('expense updated sucessfully','Close',{
            horizontalPosition:this.horizontalPosition,
            verticalPosition:this.verticalPosition,
            duration:2000,
            panelClass:['success']
           })
      },
      error=>{
        this._snackBar.open('Something went wrong','Close',{
          horizontalPosition:this.horizontalPosition,
          verticalPosition:this.verticalPosition,
          duration:2000,
          
            panelClass:['error']
         })
      }
    )
  }

  onCancel(){
    this.dialogRef.close();
  }
}
