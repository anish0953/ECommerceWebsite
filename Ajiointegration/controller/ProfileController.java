package Ajiointegration.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Ajiointegration.entities.User;
import Ajiointegration.exception.UserNotFound;
import Ajiointegration.service.ProfileService;
import Ajiointegration.service.UserService;

@RestController
@RequestMapping("Profile")
@CrossOrigin("http://localhost:3002")
public class ProfileController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ProfileService profileService;
	
	@GetMapping("/findUser/{email}")
	public  User findUserByEmail(@PathVariable String email) throws UserNotFound {
		User foundUser =userService.findbyuserEmail(email);
		return foundUser;
	}
	
	
	@PutMapping("updateProfile/")
	public User updateProfile(@RequestBody User user ) {
		System.out.println("updatedProfile User"+ user);
		return profileService.updateProfileUser(user);
	}

}
