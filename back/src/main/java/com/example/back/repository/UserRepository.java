package com.example.back.repository;

import com.example.back.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUserIdAndUserPw(String userId, String userPw);

}
