package com.tracker.models;

import java.math.BigDecimal;
import java.time.LocalDate;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "income")
public class Income {
    @Id
    private String id;
    private String title;
    private double amount;
    private String description;
    private LocalDate date;
}
