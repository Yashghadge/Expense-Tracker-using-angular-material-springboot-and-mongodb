package com.tracker.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.tracker.models.Income;

public interface IncomeRepository extends MongoRepository<Income, String>,PagingAndSortingRepository<Income, String> {

}
