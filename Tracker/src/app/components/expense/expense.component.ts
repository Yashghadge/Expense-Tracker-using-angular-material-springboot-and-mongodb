import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { error, log } from 'console';
import { Expense } from 'src/app/model/all.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ExpenseService } from 'src/app/services/expense.service';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ExpenseUpdateComponent } from '../expense-update/expense-update.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';





@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {


  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);


  displayedColumns: string[] = ['title', 'amount', 'date', 'description','actions'];
 
expense:Expense[]=[];
totalExpense:number=0;
selectedDate: Date | null = null;
addExpense:Expense={
  id:'', 
  title :'', 
  description:'',
   amount:0,
   date:''
}

expenseForm!:FormGroup;
isSubmitting:boolean=false;

@ViewChild('expform',{static:false}) expform!: NgForm;

horizontalPosition:MatSnackBarHorizontalPosition='right';
verticalPosition:MatSnackBarVerticalPosition='top'

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
    this.getAllExpense()
    this.getTotalExpense()
  }

  getTotalExpense(){
    this.dashboardService.getTotalExpense().subscribe(
      (result)=>{ this.totalExpense=result;
        console.log(result);
      } ,
      error =>console.log(error)
       
    )
  }

  getAllExpense(){
    this.expenseService.getAllExpense().subscribe(
      (result)=>{ this.expense=result;
        console.log(result);
        
      }
    )
  }

  CreateExpense(){
   if(this.addExpense != null){
    this.expenseService.addExpense(this.addExpense).subscribe(
      data =>{this.addExpense = data;
        console.log(data);
        this.expform.reset();
        this._snackBar.open('Expense added sucessfully','Close',{
          horizontalPosition:this.horizontalPosition,
          verticalPosition:this.verticalPosition,
          duration:2000
         }),
        this.getAllExpense();
        this.getTotalExpense();
      }
    )
   }else{
    this._snackBar.open('Something went wrong','Close',{
      horizontalPosition:this.horizontalPosition,
      verticalPosition:this.verticalPosition,
      duration:2000
     })
   }
  }

  deleteExpense(id:string){
    this.expenseService.deleteExpense(id).subscribe(
    (result)=>{console.log(result);
      this._snackBar.open('Expense deleted sucessfully','Close',{
        horizontalPosition:this.horizontalPosition,
        verticalPosition:this.verticalPosition,
        duration:1500,
        panelClass:['success']
       }),
      this.getAllExpense();
      this.getTotalExpense();
    },
    error=>{
      this._snackBar.open('Error while deleting expense','Close',{
        horizontalPosition:this.horizontalPosition,
        verticalPosition:this.verticalPosition,
        duration:1500,
        panelClass:['error']
       }),
       this.getAllExpense();
       this.getTotalExpense();
    }
    )
  }

  openUpdateDialog(expense: Expense): void {
    const dialogRef = this.dialog.open(ExpenseUpdateComponent, {
      width: '400px',
      data: expense
    });

    dialogRef.afterClosed().subscribe(
      result =>{
        if (result) {
          this.getAllExpense();
          this.getTotalExpense();
          this.getTotalExpense();
        }
      }
    )
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
          this.getAllExpense();
          this.getTotalExpense()
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
  
  deleteExpenseDialog(id: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.expenseService.deleteExpense(id).subscribe(
          (result) => {
            console.log(result);
            this._snackBar.open('Expense deleted successfully', 'Close', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 2000,
              panelClass: ['success']
            }),
              this.getAllExpense();
            this.getTotalExpense();
          },
          error => {
            this._snackBar.open('Error occurred while deleting expense', 'Close', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 1500,
              panelClass: ['error']
            }),
            this.getAllExpense();
            this.getTotalExpense();
          },
        )
      }
    });
  }

}
