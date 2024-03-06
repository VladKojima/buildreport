package ru.duvalov.buildingReports.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ru.duvalov.buildingReports.dto.BuildingDTO;
import ru.duvalov.buildingReports.models.Building;
import ru.duvalov.buildingReports.repos.BuildingRepo;

@Service
public class BuildingService {

    @Autowired
    private BuildingRepo bRepo;

    public Building findById(Integer id) {
        return bRepo.findById(id).orElse(null);
    }

    public Building add(BuildingDTO dto){
        return bRepo.save(new Building(null, dto.title, dto.address, dto.registerDate));
    }
    
}
