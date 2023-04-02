import { FC } from "react";
import { Pagination } from "../Pagination/Pagination";
import { ProductCard } from "./ProductCard/ProductCard";
import styles from "./ProductList.module.scss";
import { getFilteredAndSortedProducts } from "../../../../store/selectors";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/redux";
import { addItemToBasket, refreshLocalStorageBasket } from "../../../../store/reducers/basketSlice";

export const ProductList: FC = () => {
  const products = getFilteredAndSortedProducts();
  const basket = useAppSelector((state) => state.basket);
  const productsIdInBasket = Object.keys(basket).map((el) => +el);

  const dispatch = useAppDispatch();
  const addItemToBasketHandler = (id: number) => {
    dispatch(addItemToBasket(String(id)));
    dispatch(refreshLocalStorageBasket());
  };

  const { currentPage, numberOfItemsPerPage } = useAppSelector(
    (state) => state.filteres
  );

  const productsForPage = products.slice(
    (currentPage - 1) * numberOfItemsPerPage,
    currentPage * numberOfItemsPerPage
  );

  const numberOfPages = Math.ceil(products.length / numberOfItemsPerPage);

  return (
    <div className={styles._}>
      {!productsForPage.length && <h2 className={styles.nothingFound}>Ничего не найдено...</h2>}
      <div className={styles.listWrapper}>
        {productsForPage.map((product) => (
          <ProductCard
            numberOfProductsInBasket={basket[product.id]}
            key={product.id}
            product={product}
            hasInBasket={productsIdInBasket.includes(product.id)}
            onButtonClick={addItemToBasketHandler}
          />
        ))}
      </div>
      {numberOfPages > 1 && (
        <Pagination numberOfPages={numberOfPages} currentPage={currentPage} />
      )}
    </div>
  );
};