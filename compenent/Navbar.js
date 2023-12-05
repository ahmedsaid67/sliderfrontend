import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useWindowSize from './useWindowSize';
import styles from '../styles/Navbar.module.css';
import Image from 'next/image';

const Navbar = () => {
  const [width] = useWindowSize();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      setActiveSubMenu(null);
    }
  };

  const isMobile = width < 768;

  async function getIndex() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/appname/menuitems/menu/selected/");
      setMenuItems(response.data);
    } catch (error) {
      console.error("Hata oluştu:", error);
    }
  }

  useEffect(() => {
    getIndex();
  }, []);

  const handleSubMenuExpand = (itemId) => {
    if (menuItems.some(item => item.parent === itemId)) {
      setActiveSubMenu(activeSubMenu === itemId ? null : itemId);
    }
  };

  const renderSubMenu = (parentId) => {
    return (
      <ul className={styles.subMenu}>
        {menuItems.filter(item => item.parent === parentId).map(subItem => (
          <li key={subItem.id} className={styles.subNavItem}>
            {subItem.title}
          </li>
        ))}
      </ul>
    );
  };

  const renderSubMenu2 = (parentId) => {
    return (
      <ul className={styles.navMenu}>
        {menuItems.filter(item => item.parent === parentId).map(item => (
          <li key={item.id} className={styles.navItem}>
            {item.title}
          </li>
        ))}
      </ul>
    );
  };

 

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Image src="/kuramerlogo.png" alt="Logo" width={40} height={40} />
        </div>
        {isMobile && (
          <button onClick={toggleMenu} className={styles.hamburgerButton}>
            <div className={styles.hamburgermenu}></div>
            <div className={styles.hamburgermenu}></div>
            <div className={styles.hamburgermenu}></div>
          </button>
        )}
        {isMobile && menuOpen && (
          <>
            {activeSubMenu === null ? (
              <ul className={styles.navMenu}>
                {menuItems.filter(item => !item.parent).map(item => (
                  <li key={item.id} 
                      className={styles.navItem}
                      onClick={() => handleSubMenuExpand(item.id)}>
                    {item.title}
                    {menuItems.some(subItem => subItem.parent === item.id) && (
                      <span className={styles.expandIcon}></span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <button onClick={() => setActiveSubMenu(null)} className={styles.backButton}></button>
                {renderSubMenu2(activeSubMenu)}
              </>
            )}
          </>
        )}
        {!isMobile && (
          <ul className={styles.navMenu}>
          {menuItems.filter(item => !item.parent).map(item => (
            <div key={item.id} className={styles.menuItemContainer}
                 onMouseLeave={() => activeSubMenu === item.id && setActiveSubMenu(null)}>
              <li className={styles.navItem}
                  onMouseEnter={() => setActiveSubMenu(item.id)}>
                {item.title}
              </li>
              {activeSubMenu === item.id && renderSubMenu(item.id)}
            </div>
          ))}
        </ul>
        )}
      </nav>     
    </div>
  );
};

export default Navbar;








