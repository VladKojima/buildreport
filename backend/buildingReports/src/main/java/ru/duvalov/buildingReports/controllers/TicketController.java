package ru.duvalov.buildingReports.controllers;

import org.springframework.web.bind.annotation.RestController;

import ru.duvalov.buildingReports.dto.TicketDTO;
import ru.duvalov.buildingReports.models.Ticket;
import ru.duvalov.buildingReports.services.TicketService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping("/list")
    public List<Ticket> getListOfTickets(@RequestParam(required = false) Integer limit, @RequestParam(required = false) Integer skip){
        if(skip == null)
            skip = 0;
        
        if(limit == null)
            return tService.getList(skip);

        return tService.getList(limit, skip);
    }

    @PostMapping("/add")
    public Ticket add(@RequestBody TicketDTO entity) {
        return tService.add(entity);
    }
    
}
