package ru.duvalov.buildingReports.controllers;

import org.springframework.web.bind.annotation.RestController;

import ru.duvalov.buildingReports.dto.LoginDTO;
import ru.duvalov.buildingReports.security.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    PasswordEncoder pEncoder;

    @PostMapping("/login")
    public String signIn(@RequestBody LoginDTO login) {
        return authService.signIn(login.username, login.password);
    }

}
