import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Expense } from 'src/app/model/all.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
horizontalPosition:MatSnackBarHorizontalPosition='right';
verticalPosition:MatSnackBarVerticalPosition='top'

  addExpense:Expense={
    id:'', 
    title :'', 
    description:'',
     amount:0,
     date:''
  }
  
  expenseForm!:FormGroup;
  isSubmitting:boolean=false;

  constructor(private expenseService:ExpenseService,
    private dashboardService:DashboardService,
    private router:Router,
    private dialog: MatDialog,private _snackBar:MatSnackBar, private fb:FormBuilder
  ) { 
    this.expenseForm= this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      date: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  onValidCreateExpense(){
    if (this.expenseForm.valid) {
      this.isSubmitting=true;
      this.expenseService.addExpense(this.expenseForm.value).subscribe(
        (data) =>{
          console.log(data);
          // this.incform.reset();
          this._snackBar.open('Expense added sucessfully','Close',{
            horizontalPosition:this.horizontalPosition,
            verticalPosition:this.verticalPosition,
            duration:2000,
            panelClass:['success']
           }),
           this.expenseForm.reset();
          this.expenseForm.markAsPristine()
          this.expenseForm.markAsTouched();
     
           this.isSubmitting=false;
          // this.getAllExpense();
          // this.getTotalExpense()
          this.routeToExpense();
        },
        error=>{
          this._snackBar.open('Error occured while adding expense','Close',{
            horizontalPosition:this.horizontalPosition,
            verticalPosition:this.verticalPosition,
            duration:2500,
            panelClass:['error']
           })
        
        }
      )
    } else {
      this._snackBar.open('Please fill out the form correctly', 'Close', {
        duration: 3000,
        
            panelClass:['error']
      });
    }
  }


  routeToExpense(){
    this.router.navigate(['expense']);
  }

}
