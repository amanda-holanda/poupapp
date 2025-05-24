package br.com.poup.config;

import br.com.poup.model.Category;
import br.com.poup.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Component
public class CategorySeeder implements CommandLineRunner {

    @Autowired
    private CategoryRepository repository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        List<String> titles = List.of(
                "Aluguel/hipoteca",
                "Condomínio",
                "Contas de água, luz, gás",
                "Internet/telefone",
                "Plano de saúde",
                "Seguros",
                "Mensalidades escolares/faculdade",
                "Transporte público/combustível",
                "Financiamentos",
                "Impostos",
                "Supermercado/alimentação",
                "Farmácia/medicamentos",
                "Vestuário/calçados",
                "Manutenção de casa/carro",
                "Educação",
                "Cuidados pessoais",
                "Lazer/entretenimento",
                "Viagens",
                "Restaurantes/bares",
                "Assinaturas",
                "Compras por impulso",
                "Presentes/doações",
                "Hobbies/esportes",
                "Reparos domésticos",
                "Gastos médicos inesperados",
                "Multas"
        );

        titles.forEach(title -> {
            boolean exists = repository.existsByTitle(title);
            if (!exists) {
                Category category = new Category();
                category.setTitle(title);
                repository.save(category);
            }
        });
    }
}
