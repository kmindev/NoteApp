package com.example.back.repository;

import com.example.back.domain.Memo;
import com.example.back.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemoRepository extends JpaRepository<Memo, Long> {
    List<Memo> findByUser(User user);
}
