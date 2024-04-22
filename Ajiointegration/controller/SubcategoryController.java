package Ajiointegration.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Ajiointegration.entities.Subcategory;
import Ajiointegration.service.SubcategoryService;

@RestController
@RequestMapping("/subcategory")
@CrossOrigin("http://localhost:3002")

public class SubcategoryController {
	
	@Autowired
	private SubcategoryService subcategoryService;
	
	@PostMapping(value ="/saveSubcategory" , consumes ="application/json",produces = {"Application/json"})
	public Subcategory SaveSubcategory(@RequestBody Subcategory subcategory) {
		Subcategory newSubcategory = subcategoryService.addService(subcategory);
		return newSubcategory;
	} 
	
	@GetMapping("/getAllSubcategories")
	public List<Subcategory> getAllSubcategories(){
		List<Subcategory> allSubcategories = subcategoryService.getAllSubcategories();
		return allSubcategories;
	}
	
	@PutMapping("updateSubcategory")
	public Subcategory updateSubcategory(Subcategory subcategory) {
		System.out.println(subcategory.getSubcategoryId());
		System.out.println(subcategory.getSubcategoryName());
		Subcategory updatedSubcategory = subcategoryService.updateSubcategory(subcategory);
		return updatedSubcategory;	
	}
	
	@DeleteMapping("deleteSubcategory/{id}")
	public String deleteSubcategory(@PathVariable Long id) {
		return subcategoryService.deleteSubcategory(id);
	}
	
	
}
