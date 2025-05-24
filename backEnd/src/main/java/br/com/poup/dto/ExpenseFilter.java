package br.com.poup.dto;

import jakarta.validation.constraints.Min;
import lombok.Data;

import java.time.LocalDate;

public record ExpenseFilter(
        @Min(1)
        short categoryId,
        LocalDate initialDate,
        LocalDate finalDate
) {


}
