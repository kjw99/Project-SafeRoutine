package com.example.saferoutine.db.repository;

import com.example.saferoutine.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository <User,Long>{

    User findByEmail(String email);

    User findByphoneNumber(String phoneNumber);
}
