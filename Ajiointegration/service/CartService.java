package Ajiointegration.service;

import java.util.List;

import Ajiointegration.entities.CartItem;
import Ajiointegration.exception.UserNotFound;

public interface CartService {
	CartItem addProducttoCart(long userId, long productId);

	String updateProductCount(long userId, long productID, int quantity);

	List<CartItem> getAllCartItembyUserID(long userId)throws  UserNotFound,Exception ;

	String removeItemFromCart(long userId, long cartItemId);

	String clearCartItems(long userId);
	
	String calculateTotalPrice(long userId);
	
	Integer findProductIdByCartItemId(long cartItemId);
	
	boolean CheckPresentOrNot(int prId ,int userID);
	
	Integer findQuantityByCartItemId(long cartItemId);

//	int findQuantityByCartItemId(long userId, long cartItemId);

}
