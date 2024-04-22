package Ajiointegration.service;

import java.util.List;

import Ajiointegration.entities.WishlistItem;
import Ajiointegration.exception.UserNotFound;

public interface WishlistService {
	WishlistItem addProductToWishlist(long userId, long productId);
	
	List<WishlistItem> getAllWishlistItemsByUserID(long userId) throws UserNotFound, Exception;
	
	String removeItemFromWishlist(long userId, long wishlistItemId);
	
	boolean CheckPresentOrNot(int prId ,int userID);

	Integer findProductIdBywishlistItemId(long wishlistItemId);
}
