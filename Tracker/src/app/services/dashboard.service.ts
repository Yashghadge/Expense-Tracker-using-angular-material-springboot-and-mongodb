import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

    balanceUrl = "http://localhost:8100/api/balance"
    incomeUrl = "http://localhost:8100/api/income/total"
    expenseUrl = "http://localhost:8100/api/expense/total"

    getBalance():Observable<number>{
      return this.http.get<number>(`${this.balanceUrl}`);
     }
  
    getTotalIncome():Observable<number>{
      return this.http.get<number>(`${this.incomeUrl}`)
    }

    getTotalExpense():Observable<number>{
      return this.http.get<number>(`${this.expenseUrl}`)
    }
}
