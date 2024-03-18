package ru.duvalov.buildingReports.controllers;

import org.springframework.web.bind.annotation.RestController;

import ru.duvalov.buildingReports.dto.TicketDTO;
import ru.duvalov.buildingReports.models.Ticket;
import ru.duvalov.buildingReports.services.TicketService;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService tService;

    @GetMapping("/info/{id}")
    public Ticket getMethodName(@PathVariable Integer id) {
        return tService.findById(id);
    }

    @GetMapping("/list")
    public List<TicketDTO> getListOfTickets(@RequestParam(required = false) Integer limit,
            @RequestParam(required = false) Integer skip) {
        if (skip == null)
            skip = 0;

        List<Ticket> l;

        if (limit == null)
            l = tService.getList(skip);
        else
            l = tService.getList(limit, skip);

        return l.stream().map(x -> new TicketDTO(x.getId(), x.getTitle(), x.getDescription(), x.getEmail(), x.getDate(),
                x.getStatus(), x.getBuilding().getId())).toList();
    }

    @PostMapping("/add")
    public Ticket add(@RequestBody TicketDTO entity) {
        entity.date = new Date();
        return tService.add(entity);
    }

    @PutMapping("/resolve/{id}")
    public void resolve(@PathVariable Integer id) {
        tService.resolve(id);
    }

    @PutMapping("/refuse/{id}")
    public void refuse(@PathVariable Integer id) {
        tService.refuse(id);
    }

}
