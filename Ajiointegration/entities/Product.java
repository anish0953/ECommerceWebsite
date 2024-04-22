package Ajiointegration.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "Products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ProductID")
    private Long productId;

    @Column(name = "ProductName", nullable = false)
    private String productName;

    @Column(name = "Description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "Price", nullable = false)
    private Double price;

    @Column(name = "Color")
    private String color;
    
    @Column(name = "ImageLink")
    private String ImageLink;	
    
    @Column(name="Discount", columnDefinition = "VARCHAR(255) DEFAULT '0'")
    private String Discount;

    @ManyToOne
	@JoinColumn(name = "SubcategoryID")
	@JsonBackReference
    private Subcategory subcategory;
    
    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL)
    private List<CartItem> cartItems;
    
    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL)
    private List<WishlistItem> wishlistItems;
    
    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL)
	@JsonManagedReference
    private List<OrderItem> orderitems;
}
