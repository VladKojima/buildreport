package ru.duvalov.buildingReports.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import ru.duvalov.buildingReports.dto.BuildingDTO;
import ru.duvalov.buildingReports.dto.BuildingWCount;
import ru.duvalov.buildingReports.models.Building;
import ru.duvalov.buildingReports.services.BuildingService;
import ru.duvalov.buildingReports.services.TicketService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/buildings")
public class BuildingController {

    @Autowired
    private BuildingService bService;
    @Autowired
    private TicketService tService;

    @GetMapping("/find/{str}")
    public List<Building> getWithStarts(@PathVariable String str) {
        return bService.findByTitleContaining(str);
    }

    @GetMapping("/list")
    public List<BuildingWCount> getListOfBuildings(@RequestParam(required = false) Integer limit,
            @RequestParam(required = false) Integer skip) {
        if (skip == null)
            skip = 0;

        List<Building> buildings;

        if (limit == null)
            buildings = bService.getList(skip);

        else
            buildings = bService.getList(limit, skip);

        return buildings.stream()
                .map(b -> new BuildingWCount(b.getId(), b.getTitle(), b.getAddress(), b.getRegisterDate(),
                        tService.countByBuilding(b.getId())))
                .toList();
    }

    @PostMapping("/add")
    public Building add(@RequestBody BuildingDTO entity) {
        return bService.add(entity);
    }

    @PutMapping("/edit/{id}")
    public void edit(@PathVariable Integer id, @RequestBody BuildingDTO entity) {
        bService.edit(new Building(id, entity.title, entity.address, entity.registerDate));
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id) {
        bService.delete(id);
    }

}
