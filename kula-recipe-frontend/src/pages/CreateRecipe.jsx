import React , { useState, useContext }from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ReactQuill from 'react-quill';
import {useNavigate, useLocation} from 'react-router-dom'
import 'react-quill/dist/quill.snow.css';
import axios from "axios"
import { AuthContext } from '../context/authContext.jsx';
const CreateRecipe = () => {
  const state = useLocation().state;
  const navigate = useNavigate()
  const [title, setTitle] = useState(state?.title || '');
  const [time, setTime] = useState(state?.time || '');
  const [value, setValue] = useState(state?.description ||'');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState(state?.category || '')
  const [ingredientInputs, setIngredientInputs] = useState(state?.ingredients ||[{ingredient: ""}])
  const {currentUser} = useContext(AuthContext)
  const handleAddInput = (e) => {
    e.preventDefault()
    setIngredientInputs([...ingredientInputs, { ingredient: "" }]);
  };

  const handleInputChange = (event, index) => {
    let { name, value } = event.target;
    let onChangeValue = [...ingredientInputs];
    onChangeValue[index][name] = value;
    setIngredientInputs(onChangeValue);
  };
  const upload = async ()=>{
    try {
      const formData = new FormData();
      formData.append("recipeImg", file)
      const res = await axios.post("api/upload",formData)
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit = async (e)  =>{
    e.preventDefault();
    const recipeImg = await upload();
    try {
      state?await axios.patch(`api/recipes/${state.id}`, {
        title,
        description: value,
        ingredients: ingredientInputs,
        category,
        recipeImg,
        time,
        username: currentUser['_doc'].username,
      })
    : await axios.post(`api/recipes`, {
        title,
        description: value,
        ingredients: ingredientInputs,
        category,
        recipeImg,
        time,
        username: currentUser['_doc'.username],
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }

  };
  return (
    <div >
      <form encType='multipart/form-data' className="create-recipe" onSubmit={handleSubmit}>
        <div className="main-area">
          <h1>Add your Recipe</h1>
          <p>Fill out the form to add your recipe to our database</p>
          <label htmlFor="title">Recipe Name</label>
          <input type="text" id="title" name="title" onChange={(e) => setTitle(e.target.value)} required/>
          <label htmlFor="time">Cooking time</label>
          <input type="text" id="time" name="time" onChange={(e) => setTime(e.target.value)} required/>
          <label>Description</label>
          <input type="text" id="description" name="description" onChange={(e) => setValue(e.target.value)}/>
          {/*<ReactQuill theme="snow" value={value} onChange={setValue} />*/}
          <label>Ingredients</label>
          <span><h4>Example: 2 teaspoons of salt</h4></span>
          <div className="ingredient-list" >
          {/* <input type="text" name="ingredient" id="ingredient" />*/}
            {
              ingredientInputs.map((item, index) =>(
                <div className="input-container" key={index}>
                  <input name="ingredient" type="text" value={item.ingredient} onChange={(event) => handleInputChange(event, index)} />
                </div>
              ))
            }
          </div>
          <button id="ingredient-btn" className='ingredient-btn' onClick={handleAddInput}><FontAwesomeIcon icon={faPlus} style={{color: "#AC2371",}} /> Add ingredient </button>
        </div>
        <div className="side-area">
          <div className="food-category-select" style={{width:"200px",}}>
            <select name="category" defaultValue={'DEFAULT'} onChange={(e) => setCategory(e.target.value)}>
              <option value="DEFAULT" disabled>Select Food Category:</option>
              <option value="Side">Sides</option>
              <option value="Meat">Meats</option>
              <option value="Veggies">Veggies</option>
              <option value="Dessert">Desserts & Snacks</option>
            </select>
          </div>
          <label htmlFor="recipe-img">Recipe Image</label>
          <input type="file" id="recipe-img" name="recipeImg" accept="image/png, image/jpeg" onChange={(e) => setFile(e.target.files[0])}/>
          <button type='submit'>Submit/Update Recipe</button>
        </div>
      </form>
    </div>
  )
}

export default CreateRecipe