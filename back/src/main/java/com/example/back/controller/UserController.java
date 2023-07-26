package com.example.back.controller;

import com.example.back.domain.User;
import com.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/join")
    public String join(@RequestBody User user) {
        return userService.join(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        return userService.login(user);
    }


}
