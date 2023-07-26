package com.example.back.controller;

import com.example.back.domain.Memo;
import com.example.back.service.MemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/memo")
public class MemoController {
    private final MemoService memoService;

    @Autowired
    public MemoController(MemoService memoService) {
        this.memoService = memoService;
    }

    @PostMapping
    public void addMemo(@RequestBody Memo memo) {
        memoService.addMemo(memo.getContent(), memo.getUser().getUserId());
    }

    @PutMapping
    public void updateMomo(Long memoId, String content) {
        memoService.updateMemo(memoId, content);
    }

    @DeleteMapping("/{memoId}")
    public void delMemo(@PathVariable Long memoId) {
        memoService.delMemo(memoId);
    }

    @GetMapping("/{userId}")
    public List<Memo> findUserMemo(@PathVariable String userId) {
        return memoService.findUserMemo(userId);
    }
}
