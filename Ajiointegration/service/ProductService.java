package Ajiointegration.service;

import java.util.List;

import Ajiointegration.entities.Product;

public interface ProductService {
	Product AddCategory(Product product);
	List<Product> getAllProducts();
	Product updateProduct(Product product);
	String deleteProduct (long id);
	Product getByID(long id);
	List<Product> searchProducts(String search);
	List<Product> searchProductbySubcategory(String search);
	List<Product> searchAndSortByField(String field);

}
