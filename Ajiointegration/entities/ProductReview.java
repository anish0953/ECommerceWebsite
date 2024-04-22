package Ajiointegration.entities;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "ProductReviews")
public class ProductReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ReviewID")
    private Long reviewId;

    @ManyToOne
    @JoinColumn(name = "ProductID")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "UserID")
    private User user;

    @Column(name = "Rating")
    private Integer rating;

    @Column(name = "ReviewText", columnDefinition = "TEXT")
    private String reviewText;

    @Column(name = "ReviewDate")
    private Date reviewDate;

    // Constructors, getters, setters, and other methods
}

