package Ajiointegration.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Ajiointegration.entities.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long>{
	Boolean existsByuserEmail(String email);
	User findByUserEmailAndUserPassword(String userEmail, String userPassword);
	User findByuserEmail(String userEmail);

}
