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

    @PostMapping("/add_memo")
    public void addMemo(String content, String userId) {
        memoService.addMemo(content, userId);
    }

    @PutMapping("/update_memo")
    public void updateMomo(Long memoId, String content) {
        memoService.updateMemo(memoId, content);
    }

    @DeleteMapping("/delete_memo")
    public void delMemo(Long memoId) {
        memoService.delMemo(memoId);
    }

    @GetMapping("/get_memo")
    public List<Memo> findUserMemo(String userId) {
        return memoService.findUserMemo(userId);
    }
}
