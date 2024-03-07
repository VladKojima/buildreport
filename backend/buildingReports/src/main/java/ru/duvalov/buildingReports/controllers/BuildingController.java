package ru.duvalov.buildingReports.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import ru.duvalov.buildingReports.dto.BuildingDTO;
import ru.duvalov.buildingReports.models.Building;
import ru.duvalov.buildingReports.services.BuildingService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/buildings")
public class BuildingController {
    
    @Autowired
    private BuildingService bService;

    @GetMapping("/{id}")
    public Building getById(@PathVariable Integer id) {
        return bService.findById(id);
    }
    
    @PostMapping("/add")
    public Building add(@RequestBody BuildingDTO entity) {
        return bService.add(entity);
    }
    
}
