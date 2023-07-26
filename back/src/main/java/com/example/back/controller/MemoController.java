package com.example.back.controller;

import com.example.back.service.MemoService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemoController {
    private final MemoService memoService;

    public MemoController(MemoService memoService) {
        this.memoService = memoService;
    }
}
