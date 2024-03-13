package ru.duvalov.buildingReports.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import ru.duvalov.buildingReports.dto.BuildingDTO;
import ru.duvalov.buildingReports.dto.BuildingWCount;
import ru.duvalov.buildingReports.models.Building;
import ru.duvalov.buildingReports.services.BuildingService;
import ru.duvalov.buildingReports.services.TicketService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("/api/buildings")
public class BuildingController {
    
    @Autowired
    private BuildingService bService;
    @Autowired TicketService tService;

    @GetMapping("/{id}")
    public Building getById(@PathVariable Integer id) {
        return bService.findById(id);
    }

    @GetMapping("/list")
    public List<BuildingWCount> getListOfBuildings(@RequestParam(required = false) Integer limit, @RequestParam(required = false) Integer skip) {
        if(skip == null)
            skip = 0;

        List<Building> buildings;
        
        if(limit == null)
            buildings = bService.getList(skip);

        else buildings = bService.getList(limit, skip);

        return buildings.stream()
            .map(b -> new BuildingWCount(b.getId(), b.getTitle(), b.getAddress(), b.getRegisterDate(), tService.countByBuilding(b.getId())))
                .toList();
    }    
    
    @PostMapping("/add")
    public Building add(@RequestBody BuildingDTO entity) {
        return bService.add(entity);
    }
    
}
