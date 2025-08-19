import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/life.css';

const MyLifePage: React.FC = () => {
  useEffect(() => {
    // Обновляем заголовок страницы
    document.title = 'Моя история - oldzoomer | Жизнь с аутизмом и программированием';
    
    // Обновляем meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'История жизни oldzoomer - путь разработчика с аутизмом, вызовы и достижения');

    return () => {
      // Cleanup
      document.title = 'oldzoomer - Фидошник и Java-разработчик | Персональная страница';
    };
  }, []);

  return (
    <div className="page-container">
      <Link to="/" className="back-link" aria-label="Вернуться на главную страницу">
        ← Назад на главную
      </Link>
      
      <h1 aria-label="Моя история">Моя история</h1>
      <h2 aria-label="Жизнь с аутизмом и программированием">Жизнь с аутизмом и программированием</h2>
      
      <section className="life-section" aria-labelledby="intro-heading">
        <p>
          Это моя личная история о том, как я живу с расстройством аутистического спектра 
          и строю карьеру в IT. Я делюсь этим, чтобы показать, что нейроразнообразие — 
          это не препятствие, а особенность, которая может быть и вызовом, и преимуществом.
        </p>
      </section>

      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-year">3 года</div>
          <div className="timeline-content">
            <p>
              Диагноз РАС (расстройство аутистического спектра) был поставлен в раннем возрасте. 
              Уже тогда было заметно, что я воспринимаю мир по-особенному: с повышенной 
              чувствительностью к звукам, свету, с потребностью в рутине и предсказуемости.
            </p>
          </div>
        </div>
        
        <div className="timeline-item">
          <div className="timeline-year">Детство</div>
          <div className="timeline-content">
            <p>
              Социальные взаимодействия давались тяжело, но зато я проявлял интерес 
              к техническим деталям, системам и логике. Компьютеры стали для меня 
              понятным и предсказуемым миром, где все работает по четким правилам.
            </p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-year">Программирование</div>
          <div className="timeline-content">
            <p>
              Программирование оказалось идеальной сферой для моих особенностей. Код не врет, 
              он логичен и предсказуем. Отладка кода, построение архитектуры ПО, и тому подобное 
              требует того же системного мышления, которое у меня развито от природы.
            </p>
            
            <div className="strengths-list">
              <h4>Мои сильные стороны как разработчика:</h4>
              <ul>
                <li>Системное мышление и логический подход</li>
                <li>Стремление к качеству и совершенству кода</li>
                <li>Любовь к изучению новых технологий</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-year">Вызовы</div>
          <div className="timeline-content">
            <p>
              К сожалению, российский IT-рынок, особенно крупные компании (бигтех), 
              часто не готовы к нейроразнообразию. Несмотря на технические навыки, 
              я сталкиваюсь с барьерами при трудоустройстве.
            </p>
            
            <div className="challenges-list">
              <h4>Основные трудности:</h4>
              <ul>
                <li>Собеседования, ориентированные больше на "продажу себя", а не на демонстрацию навыков</li>
                <li>Недопонимание особенностей РАС со стороны HR и технических интервьюеров</li>
                <li>Стереотипы о том, что люди с аутизмом не могут работать в команде</li>
                <li>Отсутствие инклюзивных процессов найма в большинстве компаний</li>
                <li>Чувство ограниченности возможностей карьерного роста</li>
              </ul>
            </div>
            
            <div className="quote">
              "Я могу написать качественный код, решить сложную техническую задачу, 
              но мне сложно 'продать себя' на собеседовании так, как ожидают рекрутеры."
            </div>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-year">Сейчас</div>
          <div className="timeline-content">
            <p>
              Несмотря на сложности, я продолжаю развиваться как специалист. 
              Работаю над проектами, изучаю новые технологии, участвую в сообществе сети Фидонет, 
              где техническая экспертиза ценится выше социальных условностей.
            </p>
            
            <p>
              Моя цель — найти компанию или проект, где ценят результат и качество работы, 
              а не умение произвести впечатление за 60 минут интервью. Я верю, что 
              такие места существуют, и индустрия постепенно становится более инклюзивной.
            </p>
          </div>
        </div>
      </div>

      <section className="life-section" aria-labelledby="message-heading">
        <h3 id="message-heading">Почему я рассказываю об этом</h3>
        
        <p>
          Открытость в этом вопросе важна для меня по нескольким причинам:
        </p>
        
        <ol>
          <li>Чтобы показать, что люди с РАС могут быть отличными разработчиками</li>
          <li>Чтобы другие люди с похожими особенностями не чувствовали себя одинокими</li>
          <li>Чтобы работодатели задумались о важности инклюзивности</li>
          <li>Чтобы развеять мифы и стереотипы об аутизме</li>
        </ol>
      </section>

      <section className="life-section" aria-labelledby="contact-heading">
        <h3 id="contact-heading">Связаться со мной</h3>
        
        <p>
          Если вы работодатель, который готов дать шанс талантливому разработчику 
          с особенностями, или просто хотите поговорить о нейроразнообразии в IT — 
          буду рад общению через{' '}
          <a href="https://t.me/oldzoomer_ru" aria-label="Связаться через Telegram">Telegram</a>.
        </p>
      </section>
    </div>
  );
};

export default MyLifePage;
