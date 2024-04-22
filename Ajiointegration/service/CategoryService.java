package Ajiointegration.service;

import java.util.List;

import Ajiointegration.entities.Category;

public interface CategoryService {
	Category SaveCategory(Category category);
	
	List<Category> getAllCategories();
	
	Category updateCategory(Category category);
	
	String deleteCategory(long id);
}
