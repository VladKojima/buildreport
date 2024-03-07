package ru.duvalov.buildingReports.controllers;

import org.springframework.web.bind.annotation.RestController;

import ru.duvalov.buildingReports.dto.TicketDTO;
import ru.duvalov.buildingReports.models.Ticket;
import ru.duvalov.buildingReports.services.TicketService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    
    @Autowired
    private TicketService tService;

    @GetMapping("/{id}")
    public Ticket getMethodName(@PathVariable Integer id) {
        return tService.findById(id);
    }

    @PostMapping("/add")
    public Ticket add(@RequestBody TicketDTO entity) {
        return tService.add(entity);
    }
    
}