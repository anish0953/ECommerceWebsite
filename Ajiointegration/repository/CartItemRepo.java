package Ajiointegration.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import Ajiointegration.entities.CartItem;
import jakarta.transaction.Transactional;

@Repository
public interface CartItemRepo extends JpaRepository<CartItem, Long> {
	@Transactional
	@Modifying
	@Query("UPDATE CartItem c SET c.quantity = :quantity where c.cart.id= :cartID AND c.product.id= :productID")
	int updateCartItem(long cartID, long productID, int quantity);
	
	List<CartItem> findByCart_cartID(long cartID);
	
	@Transactional
	@Modifying
	@Query("DELETE FROM CartItem ci WHERE ci.cartItemId = :cartItemId")
	void deleteBycartItemId(long cartItemId);

	
	@Transactional
	@Modifying
	@Query("DELETE FROM CartItem ci WHERE ci.cart.id = :cartID")
	void deleteBycartID(long cartID);
	
	@Transactional
    @Query("SELECT ci.product.productId FROM CartItem ci WHERE ci.cartItemId = :cartItemId")
    Integer findProductIdByCartItemId(long cartItemId);
	
	@Transactional
    @Query("SELECT ci.quantity FROM CartItem ci WHERE ci.cartItemId = :cartItemId")
    Integer findQuantityByCartItemId(long cartItemId);
	
	@Query(value = "SELECT COUNT(c.cartItemId) FROM CartItem c WHERE c.product.id = :productID AND c.cart.users.userid = :userID")
	int checkProductInCart(@Param("productID") int prId, @Param("userID") int userID);

}


//SELECT COUNT(c.cart_item_id)
//FROM cart_item c
//JOIN products p ON c.productid = p.productid
//JOIN carts ca ON c.cartid = ca.cartid
//JOIN users u ON ca.userid = u.userid
//WHERE p.productid = 47 AND u.userid = 22;