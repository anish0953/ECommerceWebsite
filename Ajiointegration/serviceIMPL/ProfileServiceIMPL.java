package Ajiointegration.serviceIMPL;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Ajiointegration.entities.User;
import Ajiointegration.repository.ProfileRepo;
import Ajiointegration.service.ProfileService;

@Service
public class ProfileServiceIMPL implements ProfileService {
	
	@Autowired
	private ProfileRepo profileRepo;

	@Override
	public User updateProfileUser(User user) {
		User existingUser = profileRepo.findById(user.getUserid()).orElse(null);
		existingUser.setUserid(existingUser.getUserid());
		existingUser.setCart(existingUser.getCart());
		existingUser.setUserName(user.getUserName());
		existingUser.setUserPassword(user.getUserPassword());
		existingUser.setUserPhone(user.getUserPhone());
		existingUser.setUserEmail(existingUser.getUserEmail());
		return profileRepo.save(existingUser);
	}
}

