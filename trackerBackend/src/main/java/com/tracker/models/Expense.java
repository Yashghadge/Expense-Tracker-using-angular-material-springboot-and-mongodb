package com.tracker.models;

import java.math.BigDecimal;
import java.time.LocalDate;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@Document(collection = "expense")
public class Expense {
	 @Id
	    private String id;
	    private String title;
	    private double amount;
	    private String description;
	 
	    private LocalDate date;
}
