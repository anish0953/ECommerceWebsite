package Ajiointegration.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Ajiointegration.entities.Category;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long>{

}
