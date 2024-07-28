package com.tracker.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.tracker.services.BalanceService;

@RestController
@RequestMapping("/api/balance")
@CrossOrigin(origins = "http://localhost:4200")
public class BalanceController {
  
	@Autowired
	BalanceService balanceService;
	
	@GetMapping
	public ResponseEntity<?> totalbalance() {
		return ResponseEntity.ok(balanceService.totalbalance());
	}
}
