import { FC, useState } from "react";
import { FilterByProductProp } from "./FilterItem/FilterByProductProp";
import { PriceFIlter } from "./PriceFIlter/PriceFIlter";
import cn from "classnames";
import styles from "./GenaralFilters.module.scss";
import { useDispatch } from "react-redux";
import { getUniqValuesInProduct } from "../../../../store/selectors";
import { resetFilteres, toggleBrandFilterValue, toggleProducerСountryFilterValue } from "../../../../store/reducers/filteresSlice";
import { Icon } from "../../../ui/Icon/Icon";


export const GenaralFilters: FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const onChangeVisibility = () => {
        setIsVisible(!isVisible)
    }

    const { brands, producerСountries } = getUniqValuesInProduct()

    const dispatch = useDispatch();

    const resetFilteresHandler = () => {
        dispatch(resetFilteres());
    }
    const toggleBrandHandler = (value: string) => {
        dispatch(toggleBrandFilterValue(value))
    }
    const toggleProducerСountriesHandler = (value: string) => {
        dispatch(toggleProducerСountryFilterValue(value))
    }

    return (
        <div className={styles._}>
            <div className={styles.title}>
                ПОДБОР ПО ПАРАМЕТРАМ
                <button
                    onClick={onChangeVisibility}
                    className={cn(styles.dropdownTrigger, { [styles.dropdownTrigger_close]: !isVisible })}
                >
                    <Icon iconName="arrowDown" />
                </button>
            </div>
            {isVisible && (
                <div className={styles.content}>
                    <PriceFIlter />

                    <FilterByProductProp
                        prop="brands"
                        uniqPropValues={brands}
                        onToggle={toggleBrandHandler}
                    />

                    <FilterByProductProp
                        prop="producerСountries"
                        uniqPropValues={producerСountries}
                        onToggle={toggleProducerСountriesHandler}
                    />

                    <div className={styles.buttonsBlock}>
                        <button className={styles.applyFilteres}>Показать</button>
                        <button
                            className={styles.resetFilters}
                            onClick={resetFilteresHandler}
                        >
                            <Icon iconName="bin" />
                        </button>
                    </div>
                </div>
            )}


        </div>
    )
}