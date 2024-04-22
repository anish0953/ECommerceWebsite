package Ajiointegration.service;

import java.util.List;

import Ajiointegration.entities.Address;
import Ajiointegration.exception.NoAddressException;

public interface AddressService {
	Address addAddress(Long userId, Address address);
	
	List<Address> getAddressByUserId(Long userId)  throws NoAddressException;

	String removeAddress(Long userId, Long addressID);

	Address getAddressByAddressId(Long userId, Long addressID) throws NoAddressException;
}
