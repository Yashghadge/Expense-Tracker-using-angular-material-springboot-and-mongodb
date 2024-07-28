import { Injectable } from '@angular/core';
import { Expense } from '../model/all.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http:HttpClient) { }

   baseUrl="http://localhost:8100/api/expense"

   getAllExpense():Observable<Expense[]>{
    return this.http.get<Expense[]>(`${this.baseUrl}`);
    }

    addExpense(expense:any):Observable<any>{
     return this.http.post<Expense>(`${this.baseUrl}/add`,expense)
    }

    deleteExpense(id:string){
      return this.http.delete(`${this.baseUrl}/${id}`)
    }

    updateExpense(id:string,expense:Expense){
      return this.http.put(`${this.baseUrl}/${id}`,expense);
    }
}
