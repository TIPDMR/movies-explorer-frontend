import React from 'react';

const AboutProjectArticle = ({ aboutProjectPost }) => {
  return (
    <div className="about-project-article">
      {aboutProjectPost?.map((article, index) => (
        <article className="about-project-article__content" key={index}>
          <h3 className="about-project-article__title">{article.name}</h3>
          <p className="about-project-article__description">
            {article.desc}
          </p>
        </article>
      ))}
    </div>
  );
};

export default AboutProjectArticle;
