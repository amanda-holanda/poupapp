package br.com.poup.controller;

import br.com.poup.dto.ExpenseFilter;
import br.com.poup.dto.ExpenseRegisterDto;
import br.com.poup.dto.ExpenseUpdateDto;
import br.com.poup.model.Expense;
import br.com.poup.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/expense")
public class ExpenseController {

    @Autowired
    private ExpenseService service;

    @GetMapping("/test")
    @ResponseStatus(HttpStatus.OK)
    public String test(){
        return "Expense!";
    }


    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Expense get(
            @PathVariable Long id
    ){
        return service.findById(id);
    }

    @GetMapping("/filter")
    public List<Expense> getExpenses(
            @RequestParam(required = false) Short categoryId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate initialDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate finalDate) {

        ExpenseFilter filter = new ExpenseFilter(
                categoryId != null ? categoryId : (short) 1,
                initialDate,
                finalDate
        );
        return service.findByFilter(filter);
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public Page<Expense> getAll(
            Pageable pageable
    ){
        return service.findAll(pageable);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Expense register(
            @RequestBody @Valid ExpenseRegisterDto registerDto
    ){
        return service.resgister(registerDto);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public Expense update(
            @RequestBody @Valid ExpenseUpdateDto updateDto
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
