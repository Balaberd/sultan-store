import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductItem.module.scss";
import cn from "classnames";
import { IProduct } from "../../../../lib/types/types";
import { ProductSize } from "../../../ui/ProductSize/ProductSize";
import { Icon } from "../../../ui/Icon/Icon";


interface Props {
  product: IProduct;
  hasInBasket: boolean;
  onButtonClick: (id: number) => void;
  numberOfProductsInBasket: number;
}

export const ProductItem: FC<Props> = ({
  product: {
    id,
    name,
    sizeType,
    size,
    producingСountries,
    brand,
    description,
    price,
    typesOfApplication,
    url,
  },
  hasInBasket,
  numberOfProductsInBasket,
  onButtonClick,
}) => {
  return (
    <div className={styles._}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={url}
          alt={`${name} ${description}`}
        />
      </div>

      <ProductSize type={sizeType} value={size} />

      <Link
        to={"/catalog/" + id}
        state={{ productId: id }}
        className={styles.nameBlock}
      >
        {name} {description} <span className={styles.brand}>{brand} </span>
      </Link>

      <div className={styles.infoBlock}>
        <div className={styles.infoItem}>
          <span className={styles.infoItem__title}>Штрихкод: </span>
          <span className={styles.infoItem__content}>{id}</span>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.infoItem__title}>Производитель: </span>
          <span className={styles.infoItem__content}>{producingСountries}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoItem__title}>Бренд: </span>
          <span className={styles.infoItem__content}>{brand}</span>
        </div>
        <div className={cn(styles.infoItem, styles.testStyle)}>
          <span className={styles.infoItem__title}>
            Применение (для теста):{" "}
          </span>
          <span className={styles.infoItem__content}>{typesOfApplication}</span>
        </div>
      </div>

      <div className={styles.actionBlock}>
        <span className={styles.price}>{price} Р</span>
        <button
          className={cn(styles.addToBasketButton, {
            [styles.addToBasketButton_active]: hasInBasket,
          })}
          onClick={() => onButtonClick(id)}
        >
          В КОРЗИНУ
          <Icon className={styles.icon} iconName="basketButton" />
          {numberOfProductsInBasket && (
            <span className={styles.numberOfProducts}>
              {numberOfProductsInBasket}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
