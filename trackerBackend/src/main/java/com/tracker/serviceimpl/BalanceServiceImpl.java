package com.tracker.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.tracker.services.BalanceService;
import com.tracker.services.ExpenseService;
import com.tracker.services.IncomeService;

@Service
public class BalanceServiceImpl implements BalanceService {

	@Autowired
	IncomeService incomeService;
	
	@Autowired
	ExpenseService expenseService;
	
	@Override
	public double totalbalance() {
		// TODO Auto-generated method stub
		double balance = incomeService.totalIncome() - expenseService.totalExpense();
		return balance  ;
	}

}
