package com.tracker.services;

import java.util.List;
import java.util.Optional;

import com.tracker.dto.ExpenseDto;
import com.tracker.models.Expense;

public interface ExpenseService {
  
List<Expense> getAllExpenses();
	
	Expense addExpense(ExpenseDto expenseDto);
	
	Expense updateExpense(ExpenseDto expenseDto,String id) throws Exception ;
	
	void deleteExpense(String id);
	
	Expense  getExpenseById(String id)throws Exception;
	
	 double totalExpense();
}
