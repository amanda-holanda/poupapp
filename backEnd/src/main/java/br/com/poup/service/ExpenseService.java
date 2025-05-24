package br.com.poup.service;

import br.com.poup.dto.ExpenseFilter;
import br.com.poup.dto.ExpenseRegisterDto;
import br.com.poup.dto.ExpenseUpdateDto;
import br.com.poup.exceptions.ExpenseNotFoundException;
import br.com.poup.model.Expense;
import br.com.poup.repository.CategoryRepository;
import br.com.poup.repository.ExpenseRepository;
import br.com.poup.repository.specification.ExpenseSpecifications;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository repository;

    public Expense findById(Long id){
        Optional<Expense> optionalExpenses = repository.findById(id);

        if(optionalExpenses.isEmpty()) throw  new ExpenseNotFoundException("Expenses not found:"+id);

        return optionalExpenses.get();
    }

    public Page<Expense> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<Expense> findByFilter(ExpenseFilter filter) {
        Specification<Expense> spec = Specification.where(null);

        if (filter.categoryId() > 0) {
            spec = spec.and(ExpenseSpecifications.hasCategory(filter.categoryId()));
        }
        if (filter.initialDate() != null) {
            spec = spec.and(ExpenseSpecifications.dateFrom(filter.initialDate()));
        }
        if (filter.finalDate() != null) {
            spec = spec.and(ExpenseSpecifications.dateTo(filter.finalDate()));
        }

        return repository.findAll(spec);
    }
    public Expense resgister(ExpenseRegisterDto registerDto){
        Expense expenses = new Expense();
        expenses.setDescription(registerDto.description());
        expenses.setCategoryId(registerDto.categoryId());
        expenses.setValor(registerDto.valor());
        expenses.setDate(registerDto.date());

        return repository.save(expenses);
    }

    public Expense update(ExpenseUpdateDto updateDto){
        Optional<Expense> optionalExpenses = repository.findById(updateDto.id());

        System.out.println("Id: "+ updateDto.id());

        if(optionalExpenses.isEmpty()) throw new ExpenseNotFoundException("Expenses not found.");

        Expense expenses = new Expense();
        BeanUtils.copyProperties(updateDto, expenses);
        return repository.save(expenses);
    }

    public void delete(Long id){
        repository.findById(id).orElseThrow(() -> new ExpenseNotFoundException("Expenses not found:"+id));
        repository.deleteById(id);
    }



}
