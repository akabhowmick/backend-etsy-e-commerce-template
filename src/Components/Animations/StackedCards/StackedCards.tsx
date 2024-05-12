import { useState } from "react";
import { Product } from "../../../Types/interfaces";
import { SingleProduct } from "../../SingleProduct/SingleProduct";
import "./StackedCard.css";

export const StackedCards = ({ productsList }: { productsList: Product[] }) => {
  const [toggleAnimation, setToggleAnimation] = useState(true);

  const toggleAnimationHandler = () => {
    setToggleAnimation((state) => !state);
  };

  const stackedProductBanners = productsList.map((card, index) => {
    return (
      <li
        key={card.id}
        className={toggleAnimation ? "card" : ""}
        id={`card-${index + 1}`}
        style={{ zIndex: index + 1 }}
      >
        <SingleProduct key={card.id} product={card} displayType="" />
      </li>
    );
  });

  return (
    <div>
      <div className="toggle-switch-div">
        <label className="switch">
          <input
            type="checkbox"
            onChange={toggleAnimationHandler}
            checked={toggleAnimation}
          />
          <span className="slider round"></span>
        </label>
        <h5>Toggle Scroll Animation</h5>
      </div>

      <ul id={toggleAnimation ? "stacked-banners" : "banners"}>{stackedProductBanners}</ul>
    </div>
  );
};
