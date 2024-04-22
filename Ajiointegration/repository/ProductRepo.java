package Ajiointegration.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import Ajiointegration.entities.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long>{
		
	@Query(value = "SELECT * from products where product_name LIKE %:search%" ,nativeQuery = true)
	List<Product> getProductsBySearch(@Param("search") String search);
	
	@Query(value = "SELECT * from products po where po.subcategoryId =%:search%" ,nativeQuery = true)
	List<Product> getProductsBySubcategory(@Param("search") String search);
}
