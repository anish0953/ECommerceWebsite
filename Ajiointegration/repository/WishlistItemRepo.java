package Ajiointegration.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import Ajiointegration.entities.WishlistItem;
import jakarta.transaction.Transactional;

@Repository
public interface WishlistItemRepo extends JpaRepository<WishlistItem, Long> {
	List<WishlistItem> findByWishlist_wishlistId(long wishlistId);
	
	@Transactional
	@Modifying
	@Query("DELETE FROM WishlistItem wi WHERE wi.wishlistItemId = :wishlistItemId")
	void deleteBywishlistItemId(long wishlistItemId);
	
	@Query(value = "SELECT COUNT(wi.wishlistItemId) FROM WishlistItem wi WHERE wi.product.id = :productID AND wi.wishlist.users.userid = :userID")
	int checkProductInWishlist(@Param("productID") int prId, @Param("userID") int userID);
	
	@Transactional
    @Query("SELECT wi.product.productId FROM WishlistItem wi WHERE wi.wishlistItemId = :wishlistItemId")
    Integer findProductIdBywishlistItemId(long wishlistItemId);
}
