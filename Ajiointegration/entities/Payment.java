package Ajiointegration.entities;

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
@Table(name = "Payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PaymentID")
    private Long paymentId;

    @ManyToOne
    @JoinColumn(name = "OrderID")
    private Order order;

    @Column(name = "PaymentMethod")
    private String paymentMethod;

    @Column(name = "CardNumber")
    private String cardNumber;

    @Column(name = "ExpiryDate")
    private String expiryDate;

}
