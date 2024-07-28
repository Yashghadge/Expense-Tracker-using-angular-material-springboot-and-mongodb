import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Income } from '../model/all.model';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http:HttpClient) { }

 baseUrl="http://localhost:8100/api/income"

getAllIncome():Observable<Income[]>{
return this.http.get<Income[]>(`${this.baseUrl}`);
}

addIncome(income:any):Observable<any>{
  return this.http.post<Income>(`${this.baseUrl}/add`,income)
 }

 deleteIncome(id:string){
   return this.http.delete(`${this.baseUrl}/${id}`)
 }

 updateIncome(id:string,income:Income){
   return this.http.put(`${this.baseUrl}/${id}`,income);
 }


}
