package ru.duvalov.buildingReports.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ru.duvalov.buildingReports.models.Building;
import ru.duvalov.buildingReports.models.Ticket;

public interface TicketRepo extends JpaRepository<Ticket, Integer> {

    @Query(value = "select * from tickets order by date desc offset :skip", nativeQuery = true)
    List<Ticket> getWithSkip(@Param("skip") int skip);
    
    @Query(value = "select * from tickets order by date desc limit :limit offset :skip", nativeQuery = true)
    List<Ticket> getWithLimitAndSkip(@Param("limit") int limit, @Param("skip") int skip);
    
    int countByBuilding(Building building);
}
