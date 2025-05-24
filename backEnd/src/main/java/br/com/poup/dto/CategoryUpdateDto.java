package br.com.poup.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CategoryUpdateDto(
    @NotNull(message = "Id is required to update.")
    Long id,
    @NotBlank
    String title
) {
}
