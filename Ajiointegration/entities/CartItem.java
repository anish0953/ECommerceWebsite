package Ajiointegration.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class CartItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long cartItemId;
	private int quantity;

	@ManyToOne
	@JoinColumn(name = "productID")
	@JsonBackReference
	private Product product;
 
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "cartID")
	@JsonBackReference
	private Cart cart;
}
