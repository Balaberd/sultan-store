import { FC, useState } from "react";
import cn from "classnames";
import styles from "./ProductSetBlock.module.scss";
import { IProduct, TSizeType, TTypeOfProductApplications } from "../../../../lib/types/types";
import { APPLYING_TYPES_TRANSLATE, checkIsUrl, listOfProductApplicationTypes } from "../../../../lib/const";

const createChangerTextValues = (setter: (value: string) => void) => {
  return (event: React.ChangeEvent<HTMLInputElement>) => setter(event.target.value);
};

type TProductApply = {
  [key in TTypeOfProductApplications]: boolean;
}

interface Props {
  product: IProduct;
  cancelSetings: () => void;
  setProduct: (product: IProduct) => void;
}

export const ProductSetBlock: FC<Props> = ({ product, setProduct, cancelSetings }) => {
  const [name, setName] = useState(product.name);
  const [sizeType, setSizeType] = useState<TSizeType>(product.sizeType);
  const [size, setSize] = useState(String(product.size));
  const [producingСountries, setProducingСountries] = useState(product.producingСountries);
  const [brand, setBrand] = useState(product.brand);
  const [description, setDescription] = useState(product.description);
  const [url, setUrl] = useState(product.url);
  const [price, setPrice] = useState(String(product.price));
  const [typesOfApplication, setTypesOfApplication] = useState<TProductApply>({
    body: product.typesOfApplication.includes("body"),
    face: product.typesOfApplication.includes("face"),
    hands: product.typesOfApplication.includes("hands"),
    wash: product.typesOfApplication.includes("wash"),
    cosmetics: product.typesOfApplication.includes("cosmetics"),
    hair: product.typesOfApplication.includes("hair"),
    feet: product.typesOfApplication.includes("feet"),
  });

  const isValidValues = {
    name: !!name.trim(),
    size: !!size.trim(),
    producingСountries: !!producingСountries.trim(),
    brand: !!brand.trim(),
    description: !!description.trim(),
    url: url === product.url || checkIsUrl(url),
    price: !!price.trim() && +price > 0,
    typesOfApplication: Object.entries(typesOfApplication).some(prop => prop[1]),
  }

  const toggleSizeTypeHandler = (newType: TSizeType) => {
    setSizeType(newType);
  };
  const toggleApplyType = (type: TTypeOfProductApplications) => {
    setTypesOfApplication({
      ...typesOfApplication,
      [type]: !typesOfApplication[type],
    });
  };

  const setProductHandler = () => {

    if (Object.values(isValidValues).every(el => el)) {

      const keys: Array<keyof TProductApply> = Object.keys(typesOfApplication) as Array<keyof TProductApply>;

      setProduct({
        id: product.id,
        name,
        sizeType,
        size: +size,
        producingСountries,
        brand,
        description,
        price: +price,
        typesOfApplication: keys.filter(el => typesOfApplication[el]),
        url,
      })
    }
  };

  return (
    <div className={styles._}>
      <h2 className={styles.title}>ИЗМЕНЕНИЕ ПРОДУКТА</h2>

      <div className={styles.actionBlock}>
        <button
          onClick={setProductHandler}
          className={cn(styles.actionButton, styles.actionButton_apply)}
        >
          ИЗМЕНИТЬ
        </button>

        <button
          className={cn(styles.actionButton, styles.actionButton_cancel)}
          onClick={cancelSetings}
        >
          ОТМЕНА
        </button>
      </div>

      <div className={styles.optionsWrapper}>

        <div className={cn(styles.propWrapper, { [styles.invalid]: !isValidValues.name })}>
          <div>
            <span className={styles.subtitle}>Наименование: </span>
          </div>
          <input
            onChange={createChangerTextValues(setName)}
            className={styles.input}
            type="text"
            placeholder="введите новое значение"
            value={name}
          />
        </div>

        <div className={styles.propWrapper}>
          <div>
            <span className={styles.subtitle}>Тип размера продукта: </span>
          </div>

          <div className={styles.radios}>
            <label
              className={cn(styles.radio, {
                [styles.radio_active]: sizeType === "weight",
              })}
            >
              <input
                onChange={() => toggleSizeTypeHandler("weight")}
                type="radio"
                checked={sizeType === "weight"}
              />
              <span>Вес (гр.)</span>
            </label>

            <label
              className={cn(styles.radio, {
                [styles.radio_active]: sizeType === "volume",
              })}
            >
              <input
                onChange={() => toggleSizeTypeHandler("volume")}
                type="radio"
                checked={sizeType === "volume"}
              />
              <span>Объем (мл.)</span>
            </label>
          </div>
        </div>

        <div className={cn(styles.propWrapper, { [styles.invalid]: !isValidValues.size })}>
          <div>
            <span className={styles.subtitle}>Размер: </span>
          </div>
          <input
            onChange={createChangerTextValues(setSize)}
            className={styles.input}
            type="number"
            placeholder="введите новое значение"
            value={size}
          />
        </div>

        <div className={cn(styles.propWrapper, { [styles.invalid]: !isValidValues.price })}>
          <div>
            <span className={styles.subtitle}>Цена: </span>
          </div>
          <input
            onChange={createChangerTextValues(setPrice)}
            className={styles.input}
            type="number"
            placeholder="введите новое значение"
            value={price}
          />
        </div>

        <div className={cn(styles.propWrapper, { [styles.invalid]: !isValidValues.producingСountries })}>
          <div>
            <span className={styles.subtitle}>Страна-производитель: </span>
          </div>
          <input
            onChange={createChangerTextValues(setProducingСountries)}
            className={styles.input}
            type="text"
            placeholder="введите новое значение"
            value={producingСountries}
          />
        </div>

        <div className={cn(styles.propWrapper, { [styles.invalid]: !isValidValues.brand })}>
          <div>
            <span className={styles.subtitle}>Брэнд: </span>
          </div>
          <input
            onChange={createChangerTextValues(setBrand)}
            className={styles.input}
            type="text"
            placeholder="введите новое значение"
            value={brand}
          />
        </div>

        <div className={cn(styles.propWrapper, { [styles.invalid]: !isValidValues.description })}>
          <div>
            <span className={styles.subtitle}>Описание: </span>
          </div>
          <input
            onChange={createChangerTextValues(setDescription)}
            className={styles.input}
            type="text"
            placeholder="введите новое значение"
            value={description}
          />
        </div>

        <div className={cn(styles.propWrapper, { [styles.invalid]: !isValidValues.typesOfApplication })}>
          <div>
            <span className={styles.subtitle}>Типы применения: </span>
          </div>

          <div className={styles.checkboxes}>
            {listOfProductApplicationTypes.map((type) => (
              <label
                key={type}
                className={cn(styles.checkbox, {
                  [styles.checkbox_active]: typesOfApplication[type],
                })}
              >
                <input
                  onChange={() => toggleApplyType(type)}
                  type="checkbox"
                  checked={typesOfApplication[type]}
                />
                <span>{APPLYING_TYPES_TRANSLATE[type]}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={cn(styles.propWrapper, { [styles.invalid]: !isValidValues.url })}>
          <div>
            <span className={styles.subtitle}>Ссылка на изображение: </span>
          </div>

          <input
            onChange={createChangerTextValues(setUrl)}
            className={styles.input}
            type="text"
            placeholder="введите новое значение"
            value={url}
          />

          <div className={styles.imageWrapper}>
            <img className={styles.image} src={url} alt="изображение не найдено" />
          </div>

        </div>
      </div>
    </div>
  );
};
