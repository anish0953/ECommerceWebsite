package Ajiointegration.service;

import java.util.List;

import Ajiointegration.entities.Order;

public interface OrderService {

	Order createOrder(long userId, long addressID);


	List<Order> getAllOrdersByUserID(long userId);

}
