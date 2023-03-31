import React, { useState } from "react";
import styles from "./MenuDropdown.module.scss";
import { ContactItem } from "../ContactItem/ContactItem";
import { NavigateMenu } from "../NavigateMenu/NavigateMenu";
import { Icon } from "../../../../shared/Icon/Icon";

export const MenuDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleVisibility = () => setIsOpen(!isOpen);

    return (
        <div className={styles._}>
            <button
                className={styles.triggerButton}
                onClick={toggleVisibility}
            >
                <Icon iconName="burgerMenu" />
            </button>
            {isOpen && (
                <div className={styles.menu}>
                    <div className={styles.contactsBlock}>
                        <ContactItem
                            iconName="location"
                            title="г. Кокчетав, ул. Ж. Ташенова 129Б"
                            description="(Рынок Восточный)"
                        />
                        <ContactItem
                            iconName="mail"
                            title="opt.sultan@mail.ru "
                            description="На связи в любое время"
                        />
                        <ContactItem
                            iconName="phone"
                            title="Отдел продаж"
                            description="+7 (777) 490-00-91"
                            additionalDescription="время работы: 9:00-20:00"
                        />
                    </div>
                    <NavigateMenu />

                    <button
                        className={styles.downloadButton}
                    >
                        Прайс-лист <Icon iconName="download" />
                    </button>
                </div>
            )}
        </div>
    )
}