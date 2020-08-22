import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

export default function SingleCocktail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function getCocktail() {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];

          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }

    getCocktail();
  }, [id]);

  if (loading) {
    return <h2 className="section-title">Loading...</h2>;
  }
  if (!cocktail) {
    return <h2 className="section-title">No cocktail to display</h2>;
  } else {
    const {
      name,
      image,
      category,
      info,
      glass,
      instructions,
      ingredients,
    } = cocktail;
    return (
      <section className="section cocktail-section">
        <Link to="/" className="btn btn-primary btn-details">
          Go back home
        </Link>
        <h2 className="section-title">{name}</h2>
        <div className="drink">
          <img src={image} alt={name} />
          <div className="drink-info">
            <p>
              name : <span className="single-cocktail-detail">{name}</span>
            </p>
            <p>
              category :{' '}
              <span className="single-cocktail-detail">{category}</span>
            </p>
            <p>
              info : <span className="single-cocktail-detail">{info}</span>
            </p>
            <p>
              glass : <span className="single-cocktail-detail">{glass}</span>
            </p>
            <p>
              instructions :{' '}
              <span className="single-cocktail-detail">{instructions}</span>
            </p>
            <p>
              ingredients :{' '}
              {ingredients.map((item, index) => {
                return item ? (
                  <span className="single-cocktail-detail" key={index}>
                    {item}
                  </span>
                ) : null;
              })}
            </p>
          </div>
        </div>
      </section>
    );
  }
}
