package Ajiointegration.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Ajiointegration.entities.Subcategory;

@Repository
public interface SubcategoryRepo extends JpaRepository<Subcategory	,Long>{
	


}
