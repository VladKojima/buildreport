package ru.duvalov.buildingReports.repos;

import org.springframework.data.repository.CrudRepository;
import ru.duvalov.buildingReports.models.Building;


public interface BuildingRepo extends CrudRepository<Building, Integer>{

    
}
