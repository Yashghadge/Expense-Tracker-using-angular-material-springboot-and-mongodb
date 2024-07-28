package com.tracker.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

import lombok.Data;

@Data
public class IncomeDto {
	 private String id;
	    private String title;
	    private double amount;
	    private String description;
	    private LocalDate date;
}
