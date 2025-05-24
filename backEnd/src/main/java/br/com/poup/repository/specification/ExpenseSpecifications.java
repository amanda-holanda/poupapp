package br.com.poup.repository.specification;

import br.com.poup.model.Expense;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class ExpenseSpecifications {

    public static Specification<Expense> hasCategory(short categoryId) {
        return (root, query, cb) ->
                cb.equal(root.get("categoryId"), categoryId);
    }

    public static Specification<Expense> dateFrom(LocalDate initialDate) {
        return (root, query, cb) ->
                cb.greaterThanOrEqualTo(root.get("date"), initialDate);
    }

    public static Specification<Expense> dateTo(LocalDate finalDate) {
        return (root, query, cb) ->
                cb.lessThanOrEqualTo(root.get("date"), finalDate);
    }
}
