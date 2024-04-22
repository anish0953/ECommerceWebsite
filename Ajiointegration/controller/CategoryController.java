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

import Ajiointegration.entities.Category;
import Ajiointegration.service.CategoryService;

@RestController
@RequestMapping("Category")
@CrossOrigin("http://localhost:3002")

public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	@PostMapping(value ="/saveCategory" , consumes ="application/json",produces = {"Application/json"})
	public ResponseEntity<Category> SaveCategory(@RequestBody Category category){
		Category savedCategory = categoryService.SaveCategory(category);
		return new ResponseEntity<>(savedCategory,HttpStatus.OK);
	}
	
	@GetMapping("getAllCategories")
	public List<Category> getAllCategories(){
		List<Category> allCategories = categoryService.getAllCategories();
		return allCategories;
	}
	
	@PutMapping("/updateCategory")
	public Category updateCategory(@RequestBody Category category) {
		return categoryService.updateCategory(category);
	}
	
	@DeleteMapping("deleteCategory/{id}")
	public String deleteCategory(@PathVariable long id) {
		return categoryService.deleteCategory(id);
	}

}
