package Ajiointegration.serviceIMPL;

import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Ajiointegration.entities.Cart;
import Ajiointegration.entities.CartItem;
import Ajiointegration.entities.Product;
import Ajiointegration.entities.User;
import Ajiointegration.exception.UserNotFound;
import Ajiointegration.repository.CartItemRepo;
import Ajiointegration.repository.ProductRepo;
import Ajiointegration.repository.UserRepo;
import Ajiointegration.service.CartService;

@Service
public class CartServiceIMPL implements CartService {
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private CartItemRepo cartItemRepo;
	
	@Autowired
	private ProductRepo productRepo;
	
	

	@Override
	public CartItem addProducttoCart(long userId, long productId) {
		User user = userRepo.findById(userId).get();	
		Cart cart = user.getCart();		
		Product product = productRepo.findById(productId).get();
		
		CartItem cartItem = new CartItem();		
		cartItem.setQuantity(1);
		cartItem.setCart(cart);
		cartItem.setProduct(product);
		cartItemRepo.save(cartItem);
		return cartItem;
	}

	@Override
	public String updateProductCount(long userId, long productID, int quantity) {
		User user = userRepo.findById(userId).get();
		Cart cart = user.getCart();
		int count=cartItemRepo.updateCartItem(cart.getCartID(),productID,quantity);
		String message;
		if(count!=0) {
			message="Quantity has been successfully updated";
		}
		else message="Product not found in cart !!!";
		
		return message;
	}
 
	@Override
	public List<CartItem> getAllCartItembyUserID(long userId) throws UserNotFound, Exception {
	    User user = userRepo.findById(userId).orElse(null);
	    
	    if (user != null) {
	        Cart cart = user.getCart();
	        
	        if (cart != null) {
	            List<CartItem> cartItems = cartItemRepo.findByCart_cartID(cart.getCartID());
	            
	            for (CartItem item : cartItems) {
	                item.setProduct(item.getProduct());
	            }
	            
	            return cartItems;
	        } else {
	            throw new Exception("User has an empty cart.");
	        }
	    } else {
	        throw new Exception("User not found with ID: " + userId);
	    }
	}

//	@Override
//	public int findQuantityByCartItemId(long userId, long cartItemId) {
//	    User user = userRepo.findById(userId).orElse(null);
//	    
//	    if (user != null) {
//	        Cart cart = user.getCart();
//	        
//	        if (cart != null) {
//	            List<CartItem> cartItems = cartItemRepo.findByCart_cartID(cart.getCartID());
//	            
//	            for (CartItem item : cartItems) {
//	                if (item.getCartItemId() == cartItemId) {
//	                    return item.getQuantity();
//	                }
//	            }
//	        }
//	    }
//	    
//	    return 0; 
//	}


	@Override
	public String removeItemFromCart(long userId, long cartItemId) {
	    Optional<User> userOptional = userRepo.findById(userId);

	    if (userOptional.isPresent()) {
	        User user = userOptional.get();
	        Cart cart = user.getCart();

	        if (cart != null) {
	            List<CartItem> cartItems = cart.getCartitem();

	            if (cartItems != null) {
	                Iterator<CartItem> iterator = cartItems.iterator();

	                while (iterator.hasNext()) {
	                    CartItem item = iterator.next();

	                    if (Objects.equals(item.getCartItemId(), cartItemId)) {
	                        cartItemRepo.deleteBycartItemId(cartItemId);
	                        iterator.remove(); 
	                        return "Removed";
	                    }
	                }

	                return "Item Not Found";
	            } else {
	                return "Cart is Empty";  
	            }
	        } else {
	            return "Cart is Empty";
	        }
	    }

	    return "User not found";
	}


 
	@Override
	public String clearCartItems(long userId) {
		User user = userRepo.findById(userId).orElse(null);
		if(user!=null) {
			Cart cart=user.getCart();
			if(cart!=null) {
				cartItemRepo.deleteBycartID(cart.getCartID());
				return "Cleared";
			}
			return "Cart Already Empty";
		}
		else {
			return "User not found";
		}
	}
	
	public String calculateTotalPrice(long userId) {
		User user = userRepo.findById(userId).get();
		if(user!=null) {
			
			Cart cart=user.getCart();
			if(cart!=null) {
				Double totalDouble = cart.getCartitem().stream()
				.mapToDouble(cartitem -> cartitem.getProduct().getPrice() * cartitem.getQuantity())
				.sum();
		           String formattedTotal = String.format("%.2f", totalDouble);
		           return formattedTotal;
			}
			else {
				return "Cart is Empty";
			}
		}
		return "User not Found";
	}

	@Override
	public Integer findProductIdByCartItemId(long cartItemId) {
		Integer ProductId = cartItemRepo.findProductIdByCartItemId(cartItemId);
		return ProductId;
	}

	@Override
	public boolean CheckPresentOrNot(int prId, int userID) {
		Integer cart=cartItemRepo.checkProductInCart(prId, userID);
		if(cart !=0) {
			return true;
		}else {
			return false;
		}
	}

	@Override
	public Integer findQuantityByCartItemId(long cartItemId) {
		
		return cartItemRepo.findQuantityByCartItemId(cartItemId);
	}
}
