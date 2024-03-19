import { useEffect } from "react";
import { Product } from "../../../pages/admin/AdminProduct";
import "./ProductRegistModal.css";
import "./ProductCard.css";

const ProductCard = (props: {
  product: Product;
  productCardClick: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const { name, id, price, categories, quantityLimit, thumbnail, stock } =
    props.product;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {});
  return (
    <div className="product-card" onClick={props.productCardClick} data-id={id}>
      <div className="thumbnail">
        <img className="thumbnail" src={thumbnail} alt=""></img>
      </div>
      <div className="product-info-wrapper">
        <div className="product-title">
          {id}. {name}
        </div>
        <div className="product-category">{categories?.join(",")}</div>
        <div>{price} 원</div>
        <div>{quantityLimit} 개 / 1 인</div>
        <div>잔여 {stock} 개</div>
      </div>
    </div>
  );
};

export default ProductCard;
