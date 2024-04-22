package Ajiointegration.service;

import java.util.List;

import Ajiointegration.entities.User;
import Ajiointegration.exception.IncorrectPassword;
import Ajiointegration.exception.UserAlreadyExists;
import Ajiointegration.exception.UserNotFound;

public interface UserService {
	User findUser(long id);
	List<User> getAllUsers();
	User registerUser(User user) throws UserAlreadyExists,Exception;
	User findByUserEmailAndUserPassword(String userEmail, String userPassword) throws UserNotFound,IncorrectPassword, Exception;
	User findbyuserEmail(String userEmail) throws UserNotFound;
}
