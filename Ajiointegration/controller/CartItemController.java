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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Ajiointegration.entities.CartItem;
import Ajiointegration.exception.UserNotFound;
import Ajiointegration.service.CartService;

@RestController
@RequestMapping("CartItem")
@CrossOrigin("http://localhost:3002")
public class CartItemController {
	
	@Autowired
	private CartService cartService;
	
	@PostMapping(value = "addProductToCartbyUserIdandPID/{userId}/{productId}")
	public ResponseEntity<CartItem> addProductToCart(@PathVariable long userId,@PathVariable long productId) {
		
		CartItem cartItem = cartService.addProducttoCart(userId, productId);
		
		return new ResponseEntity<>(cartItem,HttpStatus.OK);
		
	}
	
	@PutMapping("/updateCount/{userId}/{productID}/{quantity}")
	public ResponseEntity<String> updateProductCount(@PathVariable int userId,@PathVariable long productID, @PathVariable int quantity){
		
		return new ResponseEntity<String>(cartService.updateProductCount(userId, productID, quantity),HttpStatus.OK);
	}
	
	@GetMapping("/getProductListByUserID/{userId}")
	public ResponseEntity<List<CartItem>> getProductFromCart(@PathVariable int userId) throws UserNotFound, Exception {
	    List<CartItem> userCartItemList = new ArrayList<>(); 

	    try {
	        userCartItemList = cartService.getAllCartItembyUserID(userId);
	    }catch (UserNotFound e) {
	    	throw new UserNotFound(e.getMessage()); 
	        } 
	    catch (Exception e) {
	    	throw new Exception(e.getMessage()); 
	        }

	    return new ResponseEntity<>(userCartItemList, HttpStatus.OK);
	}

	@DeleteMapping("/removeItemFromCartbyUIDandCID/{userId}/{cartItemId}")
	public ResponseEntity<String> removeFromCartbyUIDandCID(@PathVariable int userId, @PathVariable long cartItemId){
		String isRemoved = cartService.removeItemFromCart(userId, cartItemId);
		return new ResponseEntity<String>(isRemoved,HttpStatus.OK);
	}
	
	@DeleteMapping("/clearCart/{userId}")
	public ResponseEntity<String> clearCartWithUserId(@PathVariable long userId){
		String isClearedString = cartService.clearCartItems(userId);
		return new ResponseEntity<String>(isClearedString,HttpStatus.OK);
	}
		
	@GetMapping("/TotalCartPriceByUserId/{userId}")
	public ResponseEntity<String> calculatetotalPrice(@PathVariable int userId){
		String totalPriceDouble = cartService.calculateTotalPrice(userId);
		return new ResponseEntity<String>(totalPriceDouble,HttpStatus.OK);
	}

	@GetMapping("/findProductIdByCartItemId/{cartItemId}")
	public Integer  findProductIdByCartItemId(@PathVariable long cartItemId){
		Integer productid = cartService.findProductIdByCartItemId(cartItemId);
		return productid;
	}
	
	@GetMapping("/findQuantityByCartItemId/{cartItemId}")
	public Integer  findQuantityByCartItemId(@PathVariable long cartItemId){
		Integer quantity = cartService.findQuantityByCartItemId(cartItemId);
		return quantity;
	}
	
	@PostMapping("/CheckPresentbyProductIDandUserID/{productID}/{userID}")
	public ResponseEntity<Boolean> CheckPresentOrNot(@PathVariable int productID,@PathVariable int userID){
		return new ResponseEntity<Boolean>(cartService.CheckPresentOrNot(productID, userID),HttpStatus.OK);
		
	}
}
