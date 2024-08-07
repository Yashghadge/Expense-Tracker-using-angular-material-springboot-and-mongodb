import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Income } from 'src/app/model/all.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { IncomeService } from 'src/app/services/income.service';

import { UpdateIncomeComponent } from '../update-income/update-income.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { error } from 'console';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit,AfterViewInit {
  totalIncome:number=0;
  // income:Income[]=[];
  datasource = new MatTableDataSource<Income>([]);

  addIncome:Income={
    id:'', 
    title :'', 
    description:'',
     amount:0,
     date:''
  }
  displayedColumns: string[] = ['title', 'amount', 'date', 'description','actions'];

  incomeForm!:FormGroup;
  isSubmitting:boolean=false;
  @ViewChild('incform',{static:false}) incform!: NgForm;

horizontalPosition:MatSnackBarHorizontalPosition='right';
verticalPosition:MatSnackBarVerticalPosition='top'

  constructor(private dashboardService:DashboardService, private incomeService:IncomeService,
    private dialog:MatDialog,private _snackBar:MatSnackBar,
    private fb:FormBuilder
  ) { 

    this.incomeForm= this.fb.group({
      title:['',Validators.required,Validators.minLength(3)],
      description:['',Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      date: ['', [Validators.required]]
    })
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator
  }

  ngOnInit(): void {
    this.getTotalIncome();
    this.getAllIncome();

  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }


  getTotalIncome(){
    this.dashboardService.getTotalIncome().subscribe(
      (result)=>{ this.totalIncome=result;
        console.log(result);
      
      }  
    )
  }


  getAllIncome(){
    this.incomeService.getAllIncome().subscribe(
      (result)=>{ this.datasource.data=result
        console.log(result);
        
      }
    )
  }



  openUpdateDialog(income: Income): void {
    const dialogRef = this.dialog.open(UpdateIncomeComponent, {
      width: '400px',
      data: income,
      
    });

    dialogRef.afterClosed().subscribe(
      ()=>{
        this.getAllIncome();
        this.getTotalIncome()
      }
    )

  }



deleteIncomeDialog(id: string) {
  const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
    width: '250px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.incomeService.deleteIncome(id).subscribe(
        (result) => {
          console.log(result);
          this._snackBar.open('Income deleted successfully', 'Close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
            panelClass: ['success']
          }),
            this.getAllIncome();
          this.getTotalIncome();
        },
        error => {
          this._snackBar.open('Error occurred while deleting income', 'Close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 1500,
            panelClass: ['error']
          }),
            this.getAllIncome();
          this.getTotalIncome();
        },
      )
    }
  });
}

}
