package com.example.back.service;

import com.example.back.domain.Memo;
import com.example.back.domain.User;
import com.example.back.repository.MemoRepository;
import com.example.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemoService {
    private final MemoRepository memoRepository;
    private final UserRepository userRepository;

    @Autowired
    public MemoService(MemoRepository memoRepository, UserRepository userRepository) {
        this.memoRepository = memoRepository;
        this.userRepository = userRepository;
    }

    /**
     * 메모 추가
     */
    public void addMemo(String content, String userId) {
        User user = getUser(userId);

        memoRepository.save(Memo.of(content, user));
    }

    /**
     * 메모 업데이트
     */
    public void updateMemo(Long memoId, String content) {
        Memo memo = memoRepository.findById(memoId)
                .orElseThrow(() -> new IllegalArgumentException("메모가 존재하지 않습니다."));

        memo.setContent(content);
        memoRepository.save(memo);
    }

    /**
     * 메모 삭제
     */
    public void delMemo(Long memoId) {
        memoRepository.deleteById(memoId);
    }

    /**
     * 회원의 메모 조회
     */
    public List<Memo> findUserMemo(String userId) {
        return memoRepository.findByUser(getUser(userId));
    }

    private User getUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("회원이 존재하지 않습니다."));
        return user;
    }
}
