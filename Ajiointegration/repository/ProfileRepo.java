package Ajiointegration.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Ajiointegration.entities.User;

public interface ProfileRepo extends JpaRepository<User, Long>{

}
