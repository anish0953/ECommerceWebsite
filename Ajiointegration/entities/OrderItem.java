package Ajiointegration.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
public class OrderItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long orderItemId;
	
	private int quantity;
	
	@ManyToOne
	@JoinColumn(name = "orderId")
	@JsonBackReference
	private Order orders;
		
	@ManyToOne
	@JoinColumn(name = "productID")
	@JsonBackReference
	private Product product;
	
    public Long getProductId() {
        return product != null ? product.getProductId() : null;
    }
}
