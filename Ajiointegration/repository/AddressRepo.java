package Ajiointegration.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import Ajiointegration.entities.Address;



@Repository
public interface AddressRepo extends JpaRepository<Address, Long> {
    
	  @Query("DELETE FROM Address a WHERE a.address_id = :addressId AND a.users.userid = :userId")
	    @Modifying
	    void deleteByAddressIdAndUserId(@Param("addressId") Long addressId, @Param("userId") Long userId);

}
