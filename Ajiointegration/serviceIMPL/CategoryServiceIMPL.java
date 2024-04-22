package Ajiointegration.serviceIMPL;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Ajiointegration.entities.Category;
import Ajiointegration.repository.CategoryRepo;
import Ajiointegration.service.CategoryService;

@Service
public class CategoryServiceIMPL implements CategoryService {
	
	@Autowired
	private CategoryRepo categoryRepo;

	public Category SaveCategory(Category category) {
		return categoryRepo.save(category);
	}

	@Override
	public List<Category> getAllCategories() {
		List<Category> allCategories = categoryRepo.findAll();
		return allCategories;
	}

	
	public Category updateCategory(Category category) {
		Category existingCategory = categoryRepo.findById(category.getCategoryId()).orElse(null);
		existingCategory.setCategoryName(category.getCategoryName());

        return categoryRepo.save(existingCategory);
	}

	@Override
	public String deleteCategory(long id) {
		if (!categoryRepo.existsById(id)) {
			return "No Category Found to delete";
		}
		categoryRepo.deleteById(id);
		return "Category deleted ->" + id;
	}
	
	

}
