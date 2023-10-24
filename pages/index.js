

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [hoveredItemId, setHoveredItemId] = useState(null);

  async function getMenu() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/appname/menuitems/menu/selected/");
      setMenuItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Hata oluştu:", error);
    }
  }

  useEffect(() => {
    getMenu();
  }, []);

  function renderSubMenu(menuItems, parentID) {
    const subMenuItems = menuItems.filter(item => item.parent === parentID);

    if (subMenuItems.length === 0) {
      return null;
    }

    return (
      <div>
        {subMenuItems.map(item => (
          <div key={item.id}>
            <a href={item.url} style={{ color: 'blue', textDecoration: 'underline' }}>{item.title}</a>
            <div style={{ display: 'none', color: 'red', marginLeft: '5px' }}>x</div>
          </div>
        ))}
      </div>
    );
  }

  const handleItemMouseEnter = (itemId) => {
    setHoveredItemId(itemId);
  };

  const handleItemMouseLeave = () => {
    setHoveredItemId(null);
  };

  const menuStyle = {
    backgroundColor: 'lightgray',
    padding: '10px',
    border: '1px solid #ccc',
    display: "flex",
    justifyContent: "center",
  };

  return (
    <div style={menuStyle}>
      {menuItems
        .filter(item => !item.parent)
        .map(item => (
          <div
            key={item.id}
            onMouseEnter={() => handleItemMouseEnter(item.id)}
            onMouseLeave={handleItemMouseLeave}
          >
            <a href={item.url} style={{ color: 'green', margin: "5px" }}>{item.title}</a>
            {hoveredItemId === item.id && renderSubMenu(menuItems, item.id)}
          </div>
        ))}
    </div>
  );
}

export default Menu;


