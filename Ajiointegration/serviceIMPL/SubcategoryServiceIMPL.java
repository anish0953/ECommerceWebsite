package Ajiointegration.serviceIMPL;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Ajiointegration.entities.Subcategory;
import Ajiointegration.repository.SubcategoryRepo;
import Ajiointegration.service.SubcategoryService;

@Service
public class SubcategoryServiceIMPL implements SubcategoryService{

	@Autowired
	private SubcategoryRepo subcategoryRepo;

	@Override
	public Subcategory addService(Subcategory subcategory) {
		return subcategoryRepo.save(subcategory);
	}
	@Override
	public List<Subcategory> getAllSubcategories(){
		List<Subcategory> allSubcategories =  subcategoryRepo.findAll();
		return allSubcategories;
	}
	
	@Override
	public Subcategory updateSubcategory(Subcategory subcategory) {
		System.out.println(subcategory.getCategory());
		Subcategory newSubcategory = subcategoryRepo.findById(subcategory.getSubcategoryId()).orElse(null);
		newSubcategory.setSubcategoryName(subcategory.getSubcategoryName());
		newSubcategory.setCategory(subcategory.getCategory());

		return subcategoryRepo.save(newSubcategory);
		
	}
	
	@Override
	public String deleteSubcategory(long id) {
		if (!subcategoryRepo.existsById(id)) {
			return "No Repository Found to delete";
		}
		subcategoryRepo.deleteById(id);
		return "SubProduct deleted ->" + id;
	}
	
}
