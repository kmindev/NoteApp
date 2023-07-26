package com.example.back.controller;

import com.example.back.domain.User;
import com.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/join")
    public String join(User user) {
        return userService.join(user);
    }

    @PostMapping("/login")
    public String login(User user) {
        return userService.login(user);
    }


}
