package ru.duvalov.buildingReports.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ru.duvalov.buildingReports.dto.BuildingDTO;
import ru.duvalov.buildingReports.models.Building;
import ru.duvalov.buildingReports.repos.BuildingRepo;

@Service
public class BuildingService {

    @Autowired
    private BuildingRepo bRepo;

    public Building findById(int id) {
        return bRepo.findById(id).orElse(null);
    }

    public List<Building> findByTitleContaining(String str){
        return bRepo.findByTitleContainingIgnoreCase(str);
    }

    public List<Building> getList(int skip){
        return bRepo.getWithSkip(skip);
    }

    public List<Building> getList(int limit, int skip){
        return bRepo.getWithLimitAndSkip(limit, skip);
    }

    public Building add(BuildingDTO dto){
        return bRepo.save(new Building(null, dto.title, dto.address, dto.registerDate));
    }

    public void edit(Building b){
        bRepo.save(b);
    }
    
    public void delete(int id){
        bRepo.deleteById(id);
    }
}
