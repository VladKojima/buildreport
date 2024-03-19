package ru.duvalov.buildingReports.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ru.duvalov.buildingReports.dto.TicketDTO;
import ru.duvalov.buildingReports.enums.Statuses;
import ru.duvalov.buildingReports.models.Ticket;
import ru.duvalov.buildingReports.repos.TicketRepo;

@Service
public class TicketService {

    @Autowired
    private TicketRepo tRepo;
    @Autowired
    private BuildingService bService;

    public Ticket findById(int id) {
        return tRepo.findById(id).orElse(null);
    }

    public List<Ticket> getList(int skip) {
        return tRepo.getWithSkip(skip);
    }

    public List<Ticket> getList(int limit, int skip) {
        return tRepo.getWithLimitAndSkip(limit, skip);
    }

    public Ticket add(TicketDTO dto) {
        return tRepo.save(new Ticket(null, dto.title, dto.description, dto.email, dto.date, Statuses.OPEN,
                bService.findById(dto.buildingId)));

    }

    public int countByBuilding(int id) {
        return tRepo.countByBuilding(bService.findById(id));
    }

    public void resolve(int id) {
        Ticket t = tRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket is not found"));

        if (t.getStatus() != Statuses.OPEN)
            throw new RuntimeException("Ticket is closed");

        t.setStatus(Statuses.RESOLVED);

        tRepo.save(t);
    }

    public void refuse(int id) {
        Ticket t = tRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket is not found"));

        if (t.getStatus() != Statuses.OPEN)
            throw new RuntimeException("Ticket is closed");

        t.setStatus(Statuses.REFUSED);

        tRepo.save(t);
    }
}
