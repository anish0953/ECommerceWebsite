package Ajiointegration.serviceIMPL;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import Ajiointegration.entities.Product;
import Ajiointegration.repository.ProductRepo;
import Ajiointegration.service.ProductService;

@Service
public class ProductServiceIMPL implements ProductService{
	
	@Autowired
	private ProductRepo productRepo;
	
	@Override
	public Product AddCategory(Product product) {
		return productRepo.save(product);
	}
	
	@Override
	public List<Product> getAllProducts(){
		List<Product> allProducts = productRepo.findAll();
		return allProducts;
	}
	
	@Override
	public Product updateProduct(Product product) {
		Product existingProduct = productRepo.findById(product.getProductId()).orElse(null);
		existingProduct.setColor(product.getColor());
		existingProduct.setDescription(product.getDescription());
		existingProduct.setPrice(product.getPrice());
		existingProduct.setProductName(product.getProductName());
		existingProduct.setSubcategory(product.getSubcategory());
		return productRepo.save(existingProduct);
	}
	
	@Override
	public String deleteProduct (long id) {
		if (!productRepo.existsById(id)) {
			return "No Product Found to delete";
		}
		productRepo.deleteById(id);
		return "Product deleted ->" + id;
	}

	@Override
	public Product getByID(long id) {
		return productRepo.findById(id).orElse(null);
	
	}

	@Override
	public List<Product> searchProducts(String search) {
		List<Product> searchedProducts = productRepo.getProductsBySearch(search);
		return searchedProducts;
	}
	
	public List<Product> searchProductbySubcategory(String search) {
		List<Product> searchedProducts = productRepo.getProductsBySubcategory(search);
		return searchedProducts;
	}
	
	public List<Product> searchAndSortByField(String field){
		List<Product> allProducts = productRepo.findAll(Sort.by(Sort.Direction.ASC,field));
		return allProducts;
	}
	
}
