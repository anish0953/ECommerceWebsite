package Ajiointegration.serviceIMPL;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Ajiointegration.entities.Address;
import Ajiointegration.entities.Cart;
import Ajiointegration.entities.CartItem;
import Ajiointegration.entities.Order;
import Ajiointegration.entities.OrderItem;
import Ajiointegration.entities.User;
import Ajiointegration.repository.AddressRepo;
import Ajiointegration.repository.OrderRepo;
import Ajiointegration.repository.UserRepo;
import Ajiointegration.service.OrderService;

@Service
public class OrderServiceIMPL implements OrderService {
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private OrderRepo orderRepo;

	
//	@Autowired
//	private CartItemRepo cartItemRepo;
 
	@Autowired
	private AddressRepo addressRepo;
	
	@Override
	public Order createOrder(long userId, long addressID) {
	    User user = userRepo.findById(userId).orElse(null);

	    if (user != null) {
	        Cart cart = user.getCart();
	        if (cart != null && !cart.getCartitem().isEmpty()) {
	            Address selectedAddress = addressRepo.findById(addressID).orElse(null);

	            if (selectedAddress != null) {
	                Order order = new Order();
	                order.setUser(user);
	                order.setAddress(selectedAddress);

	                double totalPrice = cart.getCartitem().stream()
	                        .mapToDouble(cartItem -> cartItem.getProduct().getPrice() * cartItem.getQuantity())
	                        .sum();
	                totalPrice = totalPrice + totalPrice * 0.05 - totalPrice * 0.1 + 40;
	                order.setTotalAmount(totalPrice);

	                order.setOrderDate(new Date());
	                
	                order.setOrderItems(new ArrayList<>());

	                order.setOrderStatus("Pending");

	                for (CartItem cartItem : cart.getCartitem()) {
	                    OrderItem orderItem = new OrderItem();
	                    orderItem.setProduct(cartItem.getProduct());
	                    orderItem.setQuantity(cartItem.getQuantity());
	                    orderItem.setOrders(order);
	                    order.getOrderItems().add(orderItem);
	                }

	                Order order3 =  orderRepo.save(order);
	                System.out.println(order3.getOrderItems());
	                return order3;
	            }
	        }
	    }
	    return null;
	}
	
	@Override
	public List<Order> getAllOrdersByUserID(long userId) {
		List<Order> orders = orderRepo.findByUser_userid(userId);
		if (orders == null || orders.isEmpty()) {
			return null;
		}
		return orders;
	}
}

