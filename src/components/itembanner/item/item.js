import React from "react";
import PropTypes from 'prop-types';
import "./item.scss";
import { CartContextConsumer } from "../../../context/cart.context";
import { NavLink } from "react-router-dom";

const Item = props => {
  
  const { addProductToCart } = React.useContext(CartContextConsumer);
  const { removeProductToCart } = React.useContext(CartContextConsumer);
  
  function addP() {
    const p = { price:props.price ,title: props.title , src:props.src  };
    addProductToCart(p);
  }

  

  return (
    <div className="Item">
      <div className="discount">50% OFF</div>
      <NavLink
        to={{
          pathname: props.type + "/" + props.handle
        }}
        exact
      >
        <img src={props.src} alt="" />
   </NavLink>

      <div className="item-detail">
        <h4>{props.title}</h4>
        <h4 id="Price">{props.price} &nbsp; <strike>Rs 1000</strike> <br /> </h4>        
        
        <div class="Star">
        
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>

        </div>
        <button id="Addcart" onClick={addP}>Add To Cart</button>
      </div>
      
    </div>
  );
};

Item.propTypes = {
  title:PropTypes.string
  
}
export default Item;
