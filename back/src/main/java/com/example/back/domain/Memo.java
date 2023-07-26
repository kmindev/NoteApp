package com.example.back.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Table(name = "memo_tbl")
public class Memo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "memo_num")
    private Long memoNum;

    @Setter
    @Column(name = "content", nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Memo(String content, User user) {
        this.content = content;
        this.user = user;
    }

    public Memo() {
    }

    public static Memo of(String content, User user) {
        return new Memo(content, user);
    }
}
