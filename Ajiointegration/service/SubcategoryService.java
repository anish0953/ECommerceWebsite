package Ajiointegration.service;

import java.util.List;

import Ajiointegration.entities.Subcategory;

public interface SubcategoryService {
	Subcategory addService(Subcategory subcategory);

	List<Subcategory> getAllSubcategories();

	Subcategory updateSubcategory(Subcategory subcategory);

	String deleteSubcategory(long id);
}
