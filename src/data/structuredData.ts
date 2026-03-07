export const personStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://oldzoomer.ru",
      "name": "Егор Гаврилов",
      "jobTitle": "Java Backend Developer",
      "url": "https://oldzoomer.ru",
      "email": "work@oldzoomer.ru",
      "description": "Java Backend-разработчик, сертифицированный Vaadin и Cloud.ru специалист. Эксперт в Spring Boot и системной архитектуре.",
      "sameAs": [
        "https://t.me/oldzoomer_ru",
        "https://github.com"
      ],
      "knowsAbout": [
        "Java 21",
        "Spring Boot",
        "Kafka",
        "PostgreSQL",
        "Docker",
        "FidoNet"
      ]
    },
    {
      "@type": "SoftwareSourceCode",
      "name": "NodehistJ",
      "description": "Архивация и анализ 40-летней истории Фидонета",
      "codeRepository": "https://github.com/nodehistj",
      "programmingLanguage": "Java",
      "author": {
        "@id": "https://oldzoomer.ru"
      }
    },
    {
      "@type": "SoftwareSourceCode",
      "name": "StingrayTV Alice",
      "description": "IoT-шлюз для управления ресивером Триколора через Алису",
      "codeRepository": "https://github.com/stingraytv-alice",
      "programmingLanguage": "Java",
      "author": {
        "@id": "https://oldzoomer.ru"
      }
    }
  ]
}
