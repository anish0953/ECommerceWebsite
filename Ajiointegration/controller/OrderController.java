package Ajiointegration.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Ajiointegration.entities.Order;
import Ajiointegration.service.OrderService;

@RestController
@RequestMapping("Order")
@CrossOrigin("http://localhost:3002")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@PostMapping("/placeOrderByCartwithUIDandAID/{userId}/{addressID}")
	public ResponseEntity<Order> placeOrderByCartwithUIDandAID(@PathVariable long userId,@PathVariable long addressID) {
		Order newOrder = new Order();
		try {
			newOrder = orderService.createOrder(userId, addressID);
		} catch (Exception e) {
			System.out.println(e);
		}
		
		return new ResponseEntity<>(newOrder,HttpStatus.OK);
		
	}
	
	@GetMapping("/getAllOrdersByUserID/{userID}")
	public ResponseEntity<List<Order>> getAllOrdersByUserID(@PathVariable long userID){
		List<Order> orders = orderService.getAllOrdersByUserID(userID);
		return new ResponseEntity<>(orders,HttpStatus.OK);
		
	}
	
	
	

}
