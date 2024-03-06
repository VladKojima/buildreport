package ru.duvalov.buildingReports.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ru.duvalov.buildingReports.dto.TicketDTO;
import ru.duvalov.buildingReports.models.Ticket;
import ru.duvalov.buildingReports.repos.TicketRepo;

@Service
public class TicketService {
    
    @Autowired
    private TicketRepo tRepo;
    @Autowired
    private BuildingService bService;

    public Ticket findById(Integer id){
        return tRepo.findById(id).orElse(null);
    }

    public Ticket add(TicketDTO dto){
        return tRepo.save(new Ticket(null, dto.title, dto.description, dto.email, dto.date, dto.status, bService.findById(dto.buildingId)));

    }
}
