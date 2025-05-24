package br.com.poup.controller;

import br.com.poup.dto.CategoryRegisterDto;
import br.com.poup.dto.CategoryUpdateDto;
import br.com.poup.model.Category;
import br.com.poup.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {
    @Autowired
    private CategoryService service;

    @GetMapping("/test")
    @ResponseStatus(HttpStatus.OK)
    public String test(){
        return "Category!";
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Category get(
            @PathVariable Long id
    ){
        return service.findById(id);
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<Category> getAll(){return service.findAll();}

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Category register(
            @RequestBody @Valid CategoryRegisterDto registerDto
    ){
        return service.resgister(registerDto);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public Category update(
            @RequestBody @Valid CategoryUpdateDto updateDto
    ){
        return service.update(updateDto);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
            @PathVariable Long id
    ){
        service.delete(id);
    }
}
