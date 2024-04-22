package Ajiointegration.entities;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
    private Long userid;

    @Column(name = "Username", nullable = false)
    private String userName;

    @Column(name = "Email", unique = true, nullable = false)
    private String userEmail;

    @Column(name = "Password", nullable = false)
    private String userPassword;
    
    @Column(name = "phone_number")
    private String userPhone;
    
	@OneToOne(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonManagedReference
	@JsonIgnore
	private Cart cart;
	
	@OneToOne(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonManagedReference
	@JsonIgnore
	private Wishlist wishlist;
	

	@OneToMany(cascade = CascadeType.ALL,mappedBy = "users")
	@JsonManagedReference
	@JsonIgnore
	private List<Address> addresses ;
	
	@OneToMany(cascade = CascadeType.ALL,mappedBy = "user")
	@JsonManagedReference
	@JsonIgnore
	private List<Order> orders;

}



