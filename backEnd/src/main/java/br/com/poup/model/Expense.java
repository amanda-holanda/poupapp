package br.com.poup.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
@Getter
@Setter
@Entity
@Table(name = "poup_expenses")
public class Expense {

    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "poup_expenses_seq"
    )
    @SequenceGenerator(
            name = "poup_expenses_seq",
            sequenceName = "poup_expenses_seq",
            allocationSize = 1
    )
    @Id
    private Long id;

    private String description;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal valor;

    @Column(name = "category_id")
    private short categoryId;

    @Column(name = "created_at")
    private LocalDate date;

    //TODO: Não faz sentido, mas bug compilaçao, se não tiver...deve ter algo de errado na config do lombok
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public short getCategoryId() {
        return categoryId;
    }
    public void setCategoryId(short categoryId) {
        this.categoryId = categoryId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
