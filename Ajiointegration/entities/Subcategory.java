package Ajiointegration.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "Subcategories")
@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
public class Subcategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SubcategoryID")
    private Long subcategoryId;

    @Column(name = "SubcategoryName")
    private String subcategoryName;

    @ManyToOne
	@JoinColumn(name = "CategoryID")
	@JsonBackReference
	private Category category;
    	
    @OneToMany(mappedBy = "subcategory",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Product> product;

    
    
}
