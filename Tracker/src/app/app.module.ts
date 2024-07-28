import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IncomeComponent } from './components/income/income.component';
import { ExpenseComponent } from './components/expense/expense.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider'
import {MatGridListModule} from '@angular/material/grid-list'
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
 import {MatNativeDateModule} from '@angular/material/core';

import { MatDialogModule } from '@angular/material/dialog';
import { UpdateIncomeComponent } from './components/update-income/update-income.component';
import { ExpenseUpdateComponent } from './components/expense-update/expense-update.component';
import { UpdateExpenseComponent } from './components/update-expense/update-expense.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { AddIncomeComponent } from './components/add-income/add-income.component'
import {MatTableModule} from '@angular/material/table';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    IncomeComponent,
    ExpenseComponent,
     UpdateIncomeComponent,
    UpdateExpenseComponent,
     ExpenseUpdateComponent,
     AddExpenseComponent,
     AddIncomeComponent,
     ConfirmDeleteDialogComponent,
  
      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    ScrollingModule,
    MatPaginatorModule
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
