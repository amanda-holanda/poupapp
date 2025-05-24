package br.com.poup.dto;

import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ExpenseUpdateDto(
        @NotNull(message = "Id is required to update.")
        Long id,
        @NotNull
        String description,
        @NotNull
        BigDecimal valor,
        @NotNull
        short categoryId,
        @NotNull
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate date
) {
}
