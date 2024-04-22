package Ajiointegration.serviceIMPL;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Ajiointegration.entities.Cart;
import Ajiointegration.entities.User;
import Ajiointegration.entities.Wishlist;
import Ajiointegration.exception.IncorrectPassword;
import Ajiointegration.exception.UserAlreadyExists;
import Ajiointegration.exception.UserNotFound;
import Ajiointegration.repository.UserRepo;
import Ajiointegration.service.UserService;

@Service
public class UserServiceIMPL implements UserService{
	
	@Autowired
	private UserRepo userRepo;
	
	
	@Override
	public User registerUser(User user) throws UserAlreadyExists, Exception {
		if(userRepo.existsByuserEmail(user.getUserEmail())) {
			throw new UserAlreadyExists("User Already Exists, Please Log In");
		}
	    Cart cart = new Cart();
	    cart.setUsers(user);
	    user.setCart(cart);
	    
	    Wishlist wishlist = new Wishlist();
	    wishlist.setUsers(user);
	    user.setWishlist(wishlist);
	    
	    User newUser = userRepo.save(user);

	    return newUser;
	}

	@Override
	public User findUser(long id) {
		User findUser = userRepo.findById(id).orElse(null);
		return findUser;
	}

	@Override
	public List<User> getAllUsers() {
		return userRepo.findAll();
	}

	@Override
	public User findByUserEmailAndUserPassword(String userInputEmail, String userInputPassword) throws UserNotFound,IncorrectPassword, Exception {
			
		
		if (!userRepo.existsByuserEmail(userInputEmail)) {
			throw new UserNotFound("User Not Found, Kindly Sign In");
		}
		else {
			if ((userRepo.findByuserEmail(userInputEmail)).getUserPassword().equals(userInputPassword)) {
				return (userRepo.findByUserEmailAndUserPassword(userInputEmail, userInputPassword));
			}
			else {
				throw new IncorrectPassword("Password is Incorrect");
			}
		}

	}
	

	@Override
	public User findbyuserEmail(String userEmail) throws UserNotFound {
		if (userRepo.findByuserEmail(userEmail) == null)
			throw new UserNotFound("User Not Found, Kindly Sign In");
		return userRepo.findByuserEmail(userEmail);
	}

}
