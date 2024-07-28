import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Income } from 'src/app/model/all.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { IncomeService } from 'src/app/services/income.service';

@Component({
  selector: 'app-update-income',
  templateUrl: './update-income.component.html',
  styleUrls: ['./update-income.component.scss']
})
export class UpdateIncomeComponent implements OnInit {

horizontalPosition:MatSnackBarHorizontalPosition='right';
verticalPosition:MatSnackBarVerticalPosition='top'

  constructor(private dialogRef: MatDialogRef<UpdateIncomeComponent>,private route:ActivatedRoute,private dashboardServcie:DashboardService,
    private incomeService:IncomeService,@Inject (MAT_DIALOG_DATA) public data :Income,private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  onUpdate(){
    let date = new Date(this.data.date);
    date.setDate(date.getDate() + 0);
    const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, '0'); 
   const day = String(date.getDate()).padStart(2, '0');
   this.data.date = `${year}-${month}-${day}`;
    this.incomeService.updateIncome(this.data.id,this.data).subscribe(
      result =>{
         setInterval(()=>{
          this.incomeService.getAllIncome().subscribe(
            total =>{ console.log(total);
            }
          )
          this.dashboardServcie.getTotalIncome().subscribe(
            total =>{ console.log(total);
            }
          )
         },2200)
         this._snackBar.open('income updated sucessfully','Close',{
          horizontalPosition:this.horizontalPosition,
          verticalPosition:this.verticalPosition,
          duration:2000,
          panelClass:['success']
         }) 
          this.dialogRef.close(true);
         
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
