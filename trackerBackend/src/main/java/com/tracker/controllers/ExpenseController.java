package com.tracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tracker.dto.ExpenseDto;
import com.tracker.dto.IncomeDto;
import com.tracker.models.Expense;
import com.tracker.models.Income;
import com.tracker.services.ExpenseService;

@RestController
@RequestMapping("/api/expense")
@CrossOrigin(origins = "http://localhost:4200")
public class ExpenseController {
  
	@Autowired
	ExpenseService expenseService;
	
	@GetMapping
	public ResponseEntity<?> getALlExpenses() {
		return ResponseEntity.ok(expenseService.getAllExpenses());
	}
	
	@PostMapping("/add")
	public ResponseEntity<Expense> postMethodName(@RequestBody ExpenseDto expenseDto) {
		//TODO: process POST request
		  Expense addExpense = expenseService.addExpense(expenseDto);
		if (addExpense!= null) {
			return ResponseEntity.status(HttpStatus.CREATED).body(addExpense);
		} else {
          return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
    @GetMapping("/{id}")
    public ResponseEntity<?> getIncomeById  (@PathVariable String id) {
       try {
    	   return ResponseEntity.ok(expenseService.getExpenseById(id));
	} catch (Exception e) {
		// TODO: handle exception
		 return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> putMethodName(@PathVariable String id,
    		@RequestBody ExpenseDto expenseDto) {
        //TODO: process PUT request
    	   try {
        	   return ResponseEntity.ok(expenseService.updateExpense(expenseDto, id));
    	} catch (Exception e) {
    		// TODO: handle exception
    		 return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}catch (InternalError e) {
			// TODO: handle exception
			 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
    	}
        
    
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteIncome(@PathVariable String id) {
		expenseService.deleteExpense(id);
		 return ResponseEntity.ok().body(null);
	}
	
	
	@GetMapping("/total")
	public ResponseEntity<?> totalExpense() {
		return ResponseEntity.ok(expenseService.totalExpense());
	}
}
