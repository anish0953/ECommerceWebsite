package Ajiointegration.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Ajiointegration.entities.Product;
import Ajiointegration.service.ProductService;

@RestController
@RequestMapping("Product")
@CrossOrigin("http://localhost:3002")


public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	
	@PostMapping(value ="/saveProduct" , consumes ="application/json",produces = {"Application/json"})
	public ResponseEntity<Product> SaveProduct (@RequestBody Product product){
		Product savedProduct = productService.AddCategory(product);
		return new ResponseEntity<>(savedProduct,HttpStatus.OK);
	}
	
	@GetMapping("getProductById/{id}")
	public Product getProductById(@PathVariable long id){
		Product Product = productService.getByID(id);
		return Product;
	}
	
	@GetMapping("getAllProducts")
	public List<Product> getAllProducts(){
		List<Product> allProducts = productService.getAllProducts();
		return allProducts;
	}
	
	@GetMapping("getProductsBySearch/{search}")
	public List<Product> getProductsBySearch(@PathVariable String search){
		List<Product> allProductsSeatched = productService.searchProducts(search);
		return allProductsSeatched;
	}
	
	
	
	@PutMapping("updateProduct")
	public Product updateProduct(@RequestBody Product product) {
		return productService.updateProduct(product);
	}
	
	@DeleteMapping("deleteProduct/{id}")
	public String deleteProduct (@PathVariable long id) {
		return productService.deleteProduct(id);
	}
	
	@GetMapping("searchBySubcategoryID/{search}")
	public List<Product> searchBySubcategoryID(@PathVariable String search){
		List<Product> allProductsSeatched = productService.searchProductbySubcategory(search);
		return allProductsSeatched;
	}
	
	@GetMapping("searchAndSortByField/{field}")
	public List<Product> searchAndSortByField(@PathVariable String field){
		List<Product> sortedList = productService.searchAndSortByField(field);
		return sortedList;
	}
	
	
}
