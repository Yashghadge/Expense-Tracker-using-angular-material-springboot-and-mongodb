package com.tracker.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.domain.Page;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tracker.dto.IncomeDto;
import com.tracker.models.Income;
import com.tracker.responsewrappers.IncomeApiResponseEntity;
import com.tracker.services.IncomeService;






@RestController
@RequestMapping("/api/income")
@CrossOrigin(origins = "http://localhost:4200")
public class IncomeController {

	@Autowired
	IncomeService incomeService;
	
	IncomeApiResponseEntity irw  = new IncomeApiResponseEntity();
	
	@GetMapping()
	public ResponseEntity<?>   getAllIncomes() {
	 
	  return ResponseEntity.ok(incomeService.getAllIncomes());
	 
	}
	
	@GetMapping("/search")
	public ResponseEntity<?>   serachIncome(@RequestParam("q") String query) {
	 
	  return ResponseEntity.ok(incomeService.serachIncome(query));
	 
	}
	
	
	
//	  @GetMapping
//	    public ResponseEntity<Page<Income>> getAllIncome(
//	            @RequestParam(defaultValue = "0") int page,
//	            @RequestParam(defaultValue = "10") int size) {
//	        Page<Income> incomePage = incomeService.getAllIncomes(page, size);
//	        return ResponseEntity.ok(incomePage);
//	    }
	
	
	@PostMapping("/add")
	public ResponseEntity<Income> postMethodName(@RequestBody IncomeDto incomeDto) {
		//TODO: process POST request
		  Income addIncome = incomeService.addIncome(incomeDto);
		if (addIncome!= null) {
			return ResponseEntity.status(HttpStatus.CREATED).body(addIncome);
		} else {
          return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
    @GetMapping("/{id}")
    public ResponseEntity<?> getIncomeById  (@PathVariable String id) {
       try {
    	   return ResponseEntity.ok(incomeService.getIncomeById(id));
	} catch (Exception e) {
		// TODO: handle exception
		 return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
    }
    
	@PutMapping("/{id}")
	public ResponseEntity<?> updateincome(@PathVariable String id
			, @RequestBody IncomeDto incomeDto ) throws NotFoundException {
		//TODO: process PUT request
		   try {
	    	   return ResponseEntity.ok(incomeService.updateIncome(incomeDto, id));
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
		incomeService.deleteIncome(id);
		 return ResponseEntity.ok().body(null);
	}
	
	@GetMapping("/total")
	public ResponseEntity<?> totalIncome() {
		return ResponseEntity.ok(incomeService.totalIncome());
	}
	
	
}
