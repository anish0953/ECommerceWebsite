package Ajiointegration.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Ajiointegration.entities.WishlistItem;
import Ajiointegration.exception.UserNotFound;
import Ajiointegration.service.WishlistService;

@RestController
@RequestMapping("Wishlist")
@CrossOrigin("http://localhost:3002")
public class WishlistController {
	
	@Autowired
	private WishlistService wishlistService;
	
	@PostMapping(value = "addProductToWishlistByUserIdAndProductId/{userId}/{productId}")
	public ResponseEntity<WishlistItem> addProductToWishlist(@PathVariable long userId,@PathVariable long productId) {
		
		WishlistItem wishlistItem = wishlistService.addProductToWishlist(userId, productId);
		
		return new ResponseEntity<>(wishlistItem,HttpStatus.OK);
		
	}
	
	@GetMapping("/getProductListByUserID/{userId}")
	public ResponseEntity<List<WishlistItem>> getProductFromCart(@PathVariable int userId) throws UserNotFound, Exception {
	    List<WishlistItem> userWishlistItems = new ArrayList<>(); 

	    try {
	    	userWishlistItems = wishlistService.getAllWishlistItemsByUserID(userId);
	    }catch (UserNotFound e) {
	    	throw new UserNotFound(e.getMessage()); 
	        } 
	    catch (Exception e) {
	    	throw new Exception(e.getMessage()); 
	        }

	    return new ResponseEntity<>(userWishlistItems, HttpStatus.OK);
	}

	@DeleteMapping("removeItemFromWishlistbyUIDandWID/{userId}/{wishlistItemId}")
	public ResponseEntity<String> removeItemFromWishlistbyUIDandCID(@PathVariable int userId, @PathVariable long wishlistItemId){
		String isRemoved = wishlistService.removeItemFromWishlist(userId, wishlistItemId);
		return new ResponseEntity<String>(isRemoved,HttpStatus.OK);
	}
	
	@PostMapping("/CheckPresentbyProductIDandUserID/{productID}/{userID}")
	public ResponseEntity<Boolean> CheckPresentOrNot(@PathVariable int productID,@PathVariable int userID){
		return new ResponseEntity<Boolean>(wishlistService.CheckPresentOrNot(productID, userID),HttpStatus.OK);
		
	}
	
	@GetMapping("/findProductIdBywishlistItemId/{wishlistItemId}")
	public Integer  findProductIdByCartItemId(@PathVariable long wishlistItemId){
		Integer productid = wishlistService.findProductIdBywishlistItemId(wishlistItemId);
		return productid;
	}
}
