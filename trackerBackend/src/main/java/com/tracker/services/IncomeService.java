package com.tracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.tracker.dto.IncomeDto;
import com.tracker.models.Income;


public interface IncomeService {
   
//	Page<Income> getAllIncomes(int page,int size);

	List<Income> getAllIncomes();
	
	Income addIncome(IncomeDto incomeDto);
	
	Income updateIncome(IncomeDto incomeDto,String id) throws Exception ;
	
	void deleteIncome(String id);
	
	Income  getIncomeById(String id) throws Exception;
	
   double totalIncome();
   
    List<Income> serachIncome(String query);
 }
