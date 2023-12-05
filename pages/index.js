import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Index() {
  const [menuItems, setMenuItems] = useState([]);
  const [hoveredItemId, setHoveredItemId] = useState(null);

  async function getIndex() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/appname/menuitems/menu/selected/");
      setMenuItems(response.data);
      console.log(response.data);
      const username="ahmet67"
      const password="galatasaray3467"

      const key = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/appname/token/login/", 
        data: {
          username,
          password,
        },
      });

      console.log("key:",key.data.token)

      axios.defaults.headers.common[
        "Authorization"
      ] = `token ${key.data.token}`;

      axios.defaults.baseURL ="http://127.0.0.1:8000/api"
      const res = await axios.get("appname/auth/users/me/");
      console.log("user:",res)

    } catch (error) {
      console.error("Hata oluştu:", error);
    }
  }

  useEffect(() => {
    getIndex();
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
    flexWrap: "wrap" // Flex wrap özelliği eklendi
    
  };

  return (
    <>

      
 
    </>
  );
}

export default Index;


