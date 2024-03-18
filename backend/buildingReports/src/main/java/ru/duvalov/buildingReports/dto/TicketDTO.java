package ru.duvalov.buildingReports.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import ru.duvalov.buildingReports.enums.Statuses;

@AllArgsConstructor
public class TicketDTO {
    public Integer id;
    public String title;
    public String description;
    public String email;
    public Date date;
    public Statuses status;
    public Integer buildingId;
}
