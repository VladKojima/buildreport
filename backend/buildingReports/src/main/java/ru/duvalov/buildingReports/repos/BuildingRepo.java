package ru.duvalov.buildingReports.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ru.duvalov.buildingReports.models.Building;


public interface BuildingRepo extends JpaRepository<Building, Integer>{

    @Query(value = "select * from buildings offset :skip", nativeQuery = true)
    List<Building> getWithSkip(@Param("skip") int skip);

    @Query(value = "select * from buildings limit :limit offset :skip", nativeQuery = true)
    List<Building> getWithLimitAndSkip(@Param("limit") int limit, @Param("skip") int skip);
    
}
