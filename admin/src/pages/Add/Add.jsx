import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    use:"",
    specialty:"",
    pack:"",
    model_detail:"",
    code:"",
    dimension:"",
    category: "categ 1"
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("use", data.use);
    formData.append("specialty", data.specialty);
    formData.append("pack", data.pack);
    formData.append("dimension", data.dimension);
    formData.append("model_detail", data.model_detail);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("code", Number(data.code));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if(response.data.success) {
      setData({
        name:"",
        description:"",
        price:"",
        use:"",
        specialty:"",
        pack:"",
        model_detail:"",
        code:"",
        dimension:"",
        category:"categ 1"
      })
      setImage(false)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Dimensions</p>
          <input onChange={onChangeHandler} value={data.dimension} type="text" name='dimension' placeholder='Type here' />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Use</p>
          <textarea onChange={onChangeHandler} value={data.use} name="use" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-product-description flex-col">
          <p>Specialty</p>
          <textarea onChange={onChangeHandler} value={data.specialty} name="specialty" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-product-description flex-col">
          <p>Pack</p>
          <textarea onChange={onChangeHandler} value={data.pack} name="pack" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-product-description flex-col">
          <p>Model detail</p>
          <textarea onChange={onChangeHandler} value={data.model_detail} name="model_detail" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="categ 1">categ 1</option>
              <option value="categ 2">categ 2</option>
              <option value="categ 3">categ 3</option>
              <option value="categ 4">categ 4</option>
              <option value="categ 5">categ 5</option>
              <option value="categ 6">categ 6</option>
              <option value="categ 7">categ 7</option>
              <option value="categ 8">categ 8</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='20' required />
          </div>
          <div className="add-price flex-col">
            <p>product Code Number</p>
            <input onChange={onChangeHandler} value={data.code} type="number" name='code' placeholder='20' required />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add