package ru.duvalov.buildingReports.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ru.duvalov.buildingReports.models.User;

public interface UserRepo extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
