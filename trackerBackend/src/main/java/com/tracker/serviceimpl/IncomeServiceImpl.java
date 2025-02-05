package com.tracker.serviceimpl;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.management.AttributeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.tracker.dto.IncomeDto;
import com.tracker.models.Income;
import com.tracker.repositories.IncomeRepository;
import com.tracker.services.IncomeService;

@Service
public class IncomeServiceImpl implements IncomeService {

	@Autowired
	IncomeRepository incomeRepository;

	@Override
	public List<Income> getAllIncomes() {
		// TODO Auto-generated method stub
	  	
		return incomeRepository.findAll().stream()
				.sorted(Comparator.comparing(Income :: getDate).reversed())
				.collect(Collectors.toList());
	}

	
	@Override
	public Income addIncome(IncomeDto incomeDto) {
		// TODO Auto-generated method stub
		return saveorupdate(new Income(), incomeDto);
	}

	@Override
	public Income updateIncome(IncomeDto incomeDto, String id) throws Exception {
		// TODO Auto-generated method stub
		Optional<Income> getIncome = incomeRepository.findById(id);
		if (getIncome.isPresent()) {
			return saveorupdate(getIncome.get(), incomeDto);
		} else {
        throw  new AttributeNotFoundException("Income is not present with id "+id);
		}
	}

	@Override
	public void deleteIncome(String id) {
		// TODO Auto-generated method stub
		incomeRepository.deleteById(id);
		
	}

	
	@Override
	public Income getIncomeById(String id) throws Exception {
		// TODO Auto-generated method stub
		Optional<Income> getIncome = incomeRepository.findById(id);
		if (getIncome.isPresent()) {
			return getIncome.get();
		} else {
        throw  new AttributeNotFoundException("Income is not present with id "+id);
		}
	
	}
	
	public Income saveorupdate(Income income,IncomeDto incomeDto) {
		income.setTitle(incomeDto.getTitle());
		income.setAmount(incomeDto.getAmount());
		income.setDate(incomeDto.getDate());
		income.setDescription(incomeDto.getDescription());
		return incomeRepository.save(income);
	}

	@Override
	public double totalIncome() {
		// TODO Auto-generated method stub
		return  incomeRepository.findAll().stream().mapToDouble(Income::getAmount).sum();
	}


	@Override
	public List<Income> serachIncome(String query) {
		// TODO Auto-generated method stub
		
		return incomeRepository.findByTitleStartingWithIgnoreCase(query);
	}

//	@Override
//	public Page<Income> getAllIncomes(int page, int size) {
//		// TODO Auto-generated method stub
//		Pageable pageable = PageRequest.of(page, size, Sort.by(Direction.DESC, "date"));
//		return incomeRepository.findAll(pageable);
//	}
	
}
 