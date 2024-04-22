package Ajiointegration.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Ajiointegration.entities.Address;
import Ajiointegration.exception.NoAddressException;
import Ajiointegration.service.AddressService;

@RestController
@RequestMapping("Address")
@CrossOrigin("http://localhost:3002")
public class AddressController {
	
	@Autowired
	private AddressService addressService;
	
	@PostMapping("/addAddressToUserIDandAddress/{userId}")
	public ResponseEntity<Address> addAddressToUserIDandAddress( @RequestBody Address address , @PathVariable Long userId ){ 
	Address savedaddress = addressService.addAddress(userId, address);
	return new ResponseEntity<>(savedaddress, HttpStatus.OK);
	}
	
	@GetMapping("getAllAddressByUserId/{userId}")
	public ResponseEntity<List<Address>> getAllAddressByUserId( @PathVariable Long userId ) throws NoAddressException{
		List<Address> addressesOfUserAddresses = addressService.getAddressByUserId(userId);
		return new ResponseEntity<>(addressesOfUserAddresses, HttpStatus.OK);
		}
	
	@DeleteMapping("deleteAddressByAIDandUID/{addressId}/{userId}")
	public ResponseEntity<String> deleteAddressByAIDandUID(@PathVariable Long addressId , @PathVariable Long userId){
		
		String responseOfdeleteAddress = addressService.removeAddress(userId, addressId);
		return new ResponseEntity<>(responseOfdeleteAddress, HttpStatus.OK);

	}
	
	@GetMapping("FindAddressByAIDandUID/{addressId}/{userId}")
	public ResponseEntity<Address> FindAddressByAIDandUID(@PathVariable Long addressId , @PathVariable Long userId) throws NoAddressException{
		
		Address Address = addressService.getAddressByAddressId(userId, addressId);
		return new ResponseEntity<>(Address, HttpStatus.OK);

	}
}
