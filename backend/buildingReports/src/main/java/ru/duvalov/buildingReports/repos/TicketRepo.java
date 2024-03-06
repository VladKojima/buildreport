package ru.duvalov.buildingReports.repos;

import org.springframework.data.repository.CrudRepository;

import ru.duvalov.buildingReports.models.Ticket;

public interface TicketRepo extends CrudRepository<Ticket, Integer> {
    
}
