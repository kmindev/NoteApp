package com.example.back.service;

import com.example.back.domain.User;
import com.example.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * 회원가입(아이디, 패스워드)
     * 아이디 중복 체크 후 예외 처리
     */
    public String join(User user) {
        userRepository.findById(user.getUserId())
                .ifPresent(u -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });

        userRepository.save(user);

        return user.getUserId();
    }

    /**
     * 로그인
     * 아이디, 패스워드 해당되는 회원이 존재하면 성공
     */
    public String login(User user) {
        Optional<User> optionalUser = userRepository.findByUserIdAndUserPw(user.getUserId(), user.getUserPw());
        if (optionalUser.isPresent()) {
            return optionalUser.get().getUserId();
        }

        throw new IllegalStateException("로그인 실패");
    }
}
