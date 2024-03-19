import React, {useContext,useEffect, useState} from 'react'
import {Link, useLocation,useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare , faTrash, faPrint} from '@fortawesome/free-solid-svg-icons';
import profile from '../assets/annie-spratt-5GsbwkrCfuM-unsplash.jpg';
import axios from 'axios'
import moment from "moment"
import { AuthContext } from '../context/authContext';
import DOMPurify from "dompurify";

const SingleRecipe = () => {
  const print = () => window.print();
  const [recipe, setRecipe] = useState({});
  const location = useLocation()
  const recipeId = location.pathname.split("/")[2]
  console.log(recipeId)
  const { currentUser } = useContext(AuthContext);
  console.log("Cur " + JSON.stringify(currentUser['_doc'].username))
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/recipes/${recipeId}`);
        setRecipe(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [recipeId]);
  const handleDelete = async ()=>{
    try {
      await axios.delete(`/recipes/${recipeId}`);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <div className='single-recipe'>
      <button className='print-btn'  onClick={print}><FontAwesomeIcon icon={faPrint} style={{color: "#B80200",}} /> PRINT</button>
      <div className="content">
        <img src={`/images/${recipe?.recipeImg}`} alt="" className="banner-img" />
        <h1 className='recipe-title'>{recipe.title}</h1>
        <div className="user">
          <div className="user-top">
            <div className="user-data">
              <img src={profile} alt="" className="user-recipe-profile-photo" />
              <span style={{fontSize: "20px"}}>{recipe.username}</span>
            </div>
            <div className="btns">
              {currentUser['_doc'].username === recipe.username && 
                <div>
                  <Link to="/Recipe?edit=2" state={recipe}>
                    <FontAwesomeIcon icon={faPenToSquare} style={{color: "#AC2371",}} />
                  </Link>
                  <FontAwesomeIcon icon={faTrash} style={{color: "#B80200",}} onClick={handleDelete} />
                </div>
              }
              
            </div>
          </div>
          <div className="timeline">
            <div className="times">
              <p>Posted {moment(recipe.createdAt).fromNow()}</p> <p>Edited {moment(recipe.updatedAt).fromNow()}</p> 
            </div>
            <b>Cooking time: {recipe.time}</b>
          </div>
        </div>
      </div>
      <div className='bottom-content'>
          <p>
          {getText(recipe.description)}
          </p>
          <h1>
            Ingredients
          </h1>
          <ul>
            {recipe.ingredients?.map((r, index) =>(
              <li key={recipe}>{recipe}</li>
            ))}
          </ul>
          
        </div>
    </div>
  )
}

export default SingleRecipe