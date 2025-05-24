package br.com.poup.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "poup_categories")
public class Category {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "poup_categories_seq"
    )
    @SequenceGenerator(
            name = "poup_categories_seq",
            sequenceName = "poup_categories_seq",
            allocationSize = 1
    )
    private Long id;

    private String title;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
