package com.example.back.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "user_tbl")
@NoArgsConstructor

public class User {
    @Id
    @Column(name = "user_id")
    private String userId;

    @Column(name = "user_pw", nullable = false)
    private String userPw;
}
