package Ajiointegration.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Ajiointegration.entities.User;
import Ajiointegration.exception.IncorrectPassword;
import Ajiointegration.exception.UserAlreadyExists;
import Ajiointegration.exception.UserNotFound;
import Ajiointegration.service.UserService;

@RestController
@RequestMapping("User")
@CrossOrigin("http://localhost:3002")
public class UserController {
	
	@Autowired
	private UserService userService;
	

	@PostMapping(
		    value = "/registerUser"
		   
		)
	public ResponseEntity<User> addUser(@RequestBody User user) throws UserAlreadyExists, Exception {
		System.out.println("dOne");
		  User newUser = userService.registerUser(user);
		   return new ResponseEntity<>(newUser, HttpStatus.OK);
	}
	
	

	
	
	@GetMapping("loginUser/{userInputEmail}/{userInputPassword}")
	public User findByUserEmailAndUserPassword(@PathVariable String userInputEmail, @PathVariable String userInputPassword) throws UserNotFound,IncorrectPassword, Exception {
		try {
			return userService.findByUserEmailAndUserPassword(userInputEmail, userInputPassword);
		} catch (UserNotFound e) {
				throw new UserNotFound(e.getMessage());
		}catch (IncorrectPassword e) {
			throw new IncorrectPassword(e.getMessage());
		} 
		catch (Exception e) {
			throw new Exception();
		}
	}

	
	@GetMapping("/findUserById/{id}")
	public  ResponseEntity<User>  findUserByID(@PathVariable long id) {
		User foundUser =userService.findUser(id);
		return new ResponseEntity<>(foundUser,HttpStatus.OK);
	}
	
	@GetMapping("/findUser/{email}")
	public  ResponseEntity<User>  findUserByEmail(@PathVariable String email) throws UserNotFound {
		User foundUser =userService.findbyuserEmail(email);
		return new ResponseEntity<>(foundUser,HttpStatus.OK);
	}
	
	@GetMapping("/findAllUsers")
	public  ResponseEntity<List<User>>  findAllUsers() {
		List<User> foundUsers =userService.getAllUsers();
		return new ResponseEntity<>(foundUsers,HttpStatus.OK);
	}

}
