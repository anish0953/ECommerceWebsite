package Ajiointegration.serviceIMPL;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Ajiointegration.entities.Address;
import Ajiointegration.entities.User;
import Ajiointegration.exception.NoAddressException;
import Ajiointegration.repository.AddressRepo;
import Ajiointegration.repository.UserRepo;
import Ajiointegration.service.AddressService;
import jakarta.transaction.Transactional;

@Service
public class AddressServiceIMPL implements AddressService {
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private AddressRepo addressRepo;
	
	@Override
	public Address addAddress(Long userId, Address address) {
		Optional<User> user = userRepo.findById(userId);
		if(user.isPresent()) {
			User users = user.get();
			address.setUsers(users);
			addressRepo.save(address);
			return address;
		}
		return null;
	}

	@Override
	public List<Address> getAddressByUserId(Long userId) throws NoAddressException{
		User user = userRepo.findById(userId).orElse(null);
		if(user!=null) {
			return user.getAddresses();
		}
		else {
			throw new NoAddressException("No Address Found For User");
		}
	}

	@Override
	@Transactional
	public String removeAddress(Long userId, Long addressID) {
	    User user = userRepo.findById(userId).orElse(null);

	    if (user != null) {
	        List<Address> addresses = user.getAddresses();

	        if (addresses != null && !addresses.isEmpty()) {
	            Iterator<Address> iterator = addresses.iterator();
	            while (iterator.hasNext()) {
	                Address item = iterator.next();
	                if (item.getAddress_id() == addressID) {
	                    addressRepo.deleteByAddressIdAndUserId(addressID, userId);
	                    iterator.remove();
	                    return "Removed";
	                }
	            }
	            return "Address not found for the given ID";
	        } else {
	            return "No addresses found for the user";
	        }
	    }

	    return "User not found";
	}

	@Override
	public Address getAddressByAddressId(Long userId, Long addressID) throws NoAddressException{
		User user = userRepo.findById(userId).orElse(null);
		if(user!=null) {
			Address address = addressRepo.findById(addressID).orElse(null);
			return address;
		}
		else {
			throw new NoAddressException("No Address Found For User");
		}
	}
}
