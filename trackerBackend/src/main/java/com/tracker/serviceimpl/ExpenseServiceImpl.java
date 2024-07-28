package com.tracker.serviceimpl;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.management.AttributeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tracker.dto.ExpenseDto;
import com.tracker.models.Expense;
import com.tracker.models.Income;
import com.tracker.repositories.ExpenseRepository;
import com.tracker.services.ExpenseService;

@Service
public class ExpenseServiceImpl  implements  ExpenseService{

	@Autowired
	ExpenseRepository expenseRepository;
	
	@Override
	public List<Expense> getAllExpenses() {
		// TODO Auto-generated method stub
		return expenseRepository.findAll().stream()
				.sorted(Comparator.comparing(Expense :: getDate).reversed())
				.collect(Collectors.toList());
	}

	@Override
	public Expense addExpense(ExpenseDto expenseDto) {
		// TODO Auto-generated method stub
		
		return saveOrUpdate(new Expense(), expenseDto);
	}

	@Override
	public Expense updateExpense(ExpenseDto expenseDto, String id) throws Exception {
		// TODO Auto-generated method stub
		Optional<Expense> getExpesne = expenseRepository.findById(id);
		if (getExpesne.isPresent()) {
			return saveOrUpdate(getExpesne.get(), expenseDto);
		} else {
			throw  new AttributeNotFoundException("Expense is not present with id "+id);
		}
	}

	@Override
	public void deleteExpense(String id) {
		// TODO Auto-generated method stub
		expenseRepository.deleteById(id);
	}

	@Override
	public Expense getExpenseById(String id) throws Exception {
		// TODO Auto-generated method stub
		Optional<Expense> getExpesne = expenseRepository.findById(id);
		if (getExpesne.isPresent()) {
			return getExpesne.get();
		} else {
			throw  new AttributeNotFoundException("Expense is not present with id "+id);
		}
	}
	
     
	public Expense saveOrUpdate(Expense expense ,ExpenseDto expenseDto) {
	 expense.setTitle(expenseDto.getTitle());
	 expense.setAmount(expenseDto.getAmount());
	 expense.setDate(expenseDto.getDate());
	 expense.setDescription(expenseDto.getDescription());
	  return expenseRepository.save(expense);
	 
	 
	}

	@Override
	public double totalExpense() {
		// TODO Auto-generated method stub
		return expenseRepository.findAll().stream().mapToDouble(Expense::getAmount).sum();
	}


	
}
