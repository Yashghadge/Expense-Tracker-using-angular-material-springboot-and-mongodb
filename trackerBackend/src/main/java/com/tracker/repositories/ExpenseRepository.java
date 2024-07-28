package com.tracker.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tracker.models.Expense;


public interface ExpenseRepository extends MongoRepository<Expense, String> {

}
