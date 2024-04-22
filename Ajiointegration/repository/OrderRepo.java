package Ajiointegration.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Ajiointegration.entities.Order;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long>{
	
	List<Order> findByUser_userid(long userId);
	
	void deleteByUser_userid(int userId);

}
