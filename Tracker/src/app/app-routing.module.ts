import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IncomeComponent } from './components/income/income.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { AddIncomeComponent } from './components/add-income/add-income.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'dashboard'},
  {path:'dashboard',component:DashboardComponent},
  {path:'income',component:IncomeComponent},
  {path:'expense',component:ExpenseComponent},
  {path:'add-expense',component:AddExpenseComponent},
  {path:'add-income',component:AddIncomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
