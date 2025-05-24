package br.com.poup.service;

import br.com.poup.dto.CategoryRegisterDto;
import br.com.poup.dto.CategoryUpdateDto;
import br.com.poup.exceptions.CategoryNotFoundException;
import br.com.poup.model.Category;
import br.com.poup.repository.CategoryRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repository;

    public Category findById(Long id){
        Optional<Category> optionalCategory = repository.findById(id);

        if(optionalCategory.isEmpty()) throw  new CategoryNotFoundException("Expenses not found:"+id);

        return optionalCategory.get();
    }

    public List<Category> findAll() {
        return repository.findAll();
    }
    public Category resgister(CategoryRegisterDto registerDto){
        Category category = new Category();
        BeanUtils.copyProperties(registerDto, category);

        return repository.save(category);
    }

    public Category update(CategoryUpdateDto updateDto){
        Optional<Category> optional = repository.findById(updateDto.id());

        if(optional.isEmpty()) throw new CategoryNotFoundException("Expenses not found.");

        Category category = new Category();
        BeanUtils.copyProperties(updateDto, category);
        return repository.save(category);
    }

    public void delete(Long id){
        repository.findById(id).orElseThrow(() -> new CategoryNotFoundException("Expenses not found:"+id));
        repository.deleteById(id);
    }

}
