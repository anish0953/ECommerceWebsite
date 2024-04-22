package Ajiointegration.serviceIMPL;

import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Ajiointegration.entities.Product;
import Ajiointegration.entities.User;
import Ajiointegration.entities.Wishlist;
import Ajiointegration.entities.WishlistItem;
import Ajiointegration.exception.UserNotFound;
import Ajiointegration.repository.ProductRepo;
import Ajiointegration.repository.UserRepo;
import Ajiointegration.repository.WishlistItemRepo;
import Ajiointegration.service.WishlistService;

@Service
public class WishlistServiceIMPL implements WishlistService{
	
	@Autowired
	private WishlistItemRepo wishlistItemRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private ProductRepo productRepo;
	
	public WishlistItem addProductToWishlist(long userId, long productId) {
		User user = userRepo.findById(userId).orElse(null);
		Wishlist wishlist = user.getWishlist();
		
		Product product = productRepo.findById(productId).get();
		
		WishlistItem wishlistItem = new WishlistItem();
		wishlistItem.setProduct(product);
		wishlistItem.setWishlist(wishlist);
		wishlistItemRepo.save(wishlistItem);
		return wishlistItem;

	}
	
	public List<WishlistItem> getAllWishlistItemsByUserID(long userId) throws UserNotFound, Exception {
		User user = userRepo.findById(userId).orElse(null);
	    
	    if (user != null) {
	        Wishlist wishlist = user.getWishlist();
	        
	        if (wishlist != null) {
	            List<WishlistItem> wishlistItems = wishlistItemRepo.findByWishlist_wishlistId(wishlist.getWishlistId());
	            
	            for (WishlistItem item : wishlistItems) {
	                item.setProduct(item.getProduct());
	            }
	            
	            return wishlistItems;
	        } else {
	            throw new Exception("User has an empty Wishlist.");
	        }
	    } else {
	        throw new Exception("User not found with ID: " + userId);
	    }
	}

	
	
	
	
	@Override
	public String removeItemFromWishlist(long userId, long wishlistItemId) {
		    Optional<User> userOptional = userRepo.findById(userId);

		    if (userOptional.isPresent()) {
		        User user = userOptional.get();
		        Wishlist wishlist = user.getWishlist();

		        if (wishlist != null) {
		            List<WishlistItem> wishlistItems = wishlist.getWishlistitem();

		            if (wishlistItems != null) {
		                Iterator<WishlistItem> iterator = wishlistItems.iterator();

		                while (iterator.hasNext()) {
		                	WishlistItem item = iterator.next();

		                    if (Objects.equals(item.getWishlistItemId(), wishlistItemId)) {
		                        wishlistItemRepo.deleteBywishlistItemId(wishlistItemId);
		                        iterator.remove(); 
		                        return "Removed";
		                    }
		                }

		                return "Item Not Found";
		            } else {
		                return "Wishlist is Empty";  
		            }
		        } else {
		            return "Wishlist is Empty";
		        }
		    }

		    return "User not found";
		}

	@Override
	public boolean CheckPresentOrNot(int prId, int userID) {
		Integer itemcount=wishlistItemRepo.checkProductInWishlist(prId, userID);
		if(itemcount !=0) {
			return true;
		}else {
			return false;
		}
	}

	@Override
	public Integer findProductIdBywishlistItemId(long wishlistItemId) {
		Integer ProductId = wishlistItemRepo.findProductIdBywishlistItemId(wishlistItemId);
		return ProductId;
	}
	
	

}
