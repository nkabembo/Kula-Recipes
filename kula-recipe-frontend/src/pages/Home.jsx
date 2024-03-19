import React , {useContext, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from "axios"
import { AuthContext } from '../context/authContext';
const Home = () => {
  const {currentUser} = useContext(AuthContext)
  /*const recipes = [
    {
      id: 1,
      title: "Pondu/ Sombe",
      img: "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      title: "Pondu/ Sombe",
      img: "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 3,
      title: "Pondu/ Sombe",
      img: "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 4,
      title: "Pondu/ Sombe",
      img: "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];*/
  const [recipes, setRecipes] =useState([]);
  useEffect(() =>{
    const fetchData = async () =>{
      try {
        const res = await axios.get('api/recipes');
        setRecipes(res.data)
        //console.log('Recipes ' + JSON.stringify(recipes))
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  })
  return (
    <div className="home">
      {currentUser?
        <div>
          <h1>Contribute to our library of Recipes here at Kula!</h1>
          <p>Add new your recipes and edit them and view Recipes created by others</p>
        </div>:
        <div>
          <h1>Contribute to our library of Recipes here at Kula!</h1>
          <p>Sign up up now to to begin</p>
          <Link to='/Signup' className='signup-btn'>Sign Up</Link>
        </div>}
      
      <h1>All Recipes</h1>
      <div className="recipes">
        {recipes.map( recipe =>(
          <div className="recipe-card" key={recipe._id}>
            <img src={`/images/${recipe.recipeImg}`} alt="" />
            <Link className="link" to={`/Recipe/${recipe._id}`}>
              <h2>{recipe.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home