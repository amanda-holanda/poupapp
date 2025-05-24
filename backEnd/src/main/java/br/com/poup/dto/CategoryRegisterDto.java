package br.com.poup.dto;

import jakarta.validation.constraints.NotBlank;

public record CategoryRegisterDto(
    @NotBlank
    String title
) {
}
