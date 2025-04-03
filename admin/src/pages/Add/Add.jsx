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
    turelt:"",
    asaalt:"",
    guidel:"",
    hurd:"",
    chadal:"",
    motor75:"",
    motor100:"",
    category: "Хувийн АОС-ны цэвэр усны өргөлтийн насос"
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
    formData.append("code", data.code);
    formData.append("turelt", data.turelt);
    formData.append("category", data.category);
    formData.append("asaalt", data.asaalt);
    formData.append("guidel", data.guidel);
    formData.append("hurd", data.hurd);
    formData.append("chadal", data.chadal);
    formData.append("motor75", data.motor75);
    formData.append("motor100", data.motor100);
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
        turelt:"",asaalt:"",
        guidel:"",
        hurd:"",
        chadal:"",
        motor75:"",
        motor100:"",
        category:"Хувийн АОС-ны цэвэр усны өргөлтийн насос"
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
          <p>Шахах шингэний температур</p>
          <input onChange={onChangeHandler} value={data.dimension} type="text" name='dimension' placeholder='Type here' />
        </div>
        <div className="add-product-name flex-col">
          <p>Нэр</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-name flex-col">
          <p>Түрэлт</p>
          <input onChange={onChangeHandler} value={data.turelt} type="text" name='turelt' placeholder='Type here' />
        </div>
        <div className="add-product-name flex-col">
          <p>Хөдөлгүүрийн асаалт</p>
          <input onChange={onChangeHandler} value={data.asaalt} type="text" name='asaalt' placeholder='Type here' />
        </div>
        <div className="add-product-name flex-col">
          <p>Гүйдлийн хүч IN</p>
          <input onChange={onChangeHandler} value={data.guidel} type="text" name='guidel' placeholder='Type here' />
        </div>
        <div className="add-product-name flex-col">
          <p>Хөдөлгүүрийн хурд n</p>
          <input onChange={onChangeHandler} value={data.hurd} type="text" name='hurd' placeholder='Type here' />
        </div>
        <div className="add-product-name flex-col">
          <p>Чадлын фактор cos φ100</p>
          <input onChange={onChangeHandler} value={data.chadal} type="text" name='chadal' placeholder='Type here' />
        </div>
        <div className="add-product-name flex-col">
          <p>Моторын АҮК 75% ηM 75%</p>
          <input onChange={onChangeHandler} value={data.motor75} type="text" name='motor75' placeholder='Type here' />
        </div>
        <div className="add-product-name flex-col">
          <p>Моторын АҮК 100% ηM 100%</p>
          <input onChange={onChangeHandler} value={data.motor100} type="text" name='motor100' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Цахилгаан хүчдэл</p>
          <textarea onChange={onChangeHandler} value={data.use} name="use" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-product-description flex-col">
          <p>Хүчдлийн зөвшөөрөгдөх хазайлт</p>
          <textarea onChange={onChangeHandler} value={data.specialty} name="specialty" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-product-description flex-col">
          <p>Чадал P2</p>
          <textarea onChange={onChangeHandler} value={data.pack} name="pack" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-product-description flex-col">
          <p>Моторын АҮК ангилал</p>
          <textarea onChange={onChangeHandler} value={data.model_detail} name="model_detail" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-product-description flex-col">
          <p>Тайлбар</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category /Төрөл/</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Хувийн АОС-ны цэвэр усны өргөлтийн насос">Хувийн АОС-ны цэвэр усны өргөлтийн насос</option>
              <option value="Шалны халаалтын насос диаметр 15">Шалны халаалтын насос диаметр 15</option>
              <option value="Цэвэр усны өргөлтийн насос">Цэвэр усны өргөлтийн насос</option>
              <option value="Эрчим хүчний хэмнэлттэй ухаалаг насос">Эрчим хүчний хэмнэлттэй ухаалаг насос</option>
              <option value="Халаалтын сүлжээний босоо насос">Халаалтын сүлжээний босоо насос</option>
              <option value="Хэрэгцээний халуун усны насос">Хэрэгцээний халуун усны насос</option>
              <option value="Бохирын насос">Бохирын насос</option>
              <option value="Драйнеж гном">Драйнеж гном</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Үнэ</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='20' required />
          </div>
          <div className="add-product-name flex-col">
            <p>Бүтээл</p>
            <input onChange={onChangeHandler} value={data.code} type="text" name='code' placeholder='type here' required />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add