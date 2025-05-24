package br.com.poup.repository;

import br.com.poup.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
     Optional<Category> findById(Long id);
     boolean existsByTitle(String title);
}
