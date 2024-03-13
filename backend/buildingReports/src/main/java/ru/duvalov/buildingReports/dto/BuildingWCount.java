package ru.duvalov.buildingReports.dto;

import java.util.Date;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class BuildingWCount {
    public int id;
    public String title;
    public String address;
    public Date registerDate;
    public int ticketCount;
}
