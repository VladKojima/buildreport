package ru.duvalov.buildingReports.dto;

import java.util.Date;

import ru.duvalov.buildingReports.enums.Statuses;

public class TicketDTO {
    public String title;
    public String description;
    public String email;
    public Date date;
    public Statuses status;
    public Integer buildingId;
}
