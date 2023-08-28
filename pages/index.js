import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

const Home = () => {
  const [data, setData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/appname/sliders/');
        const responseData = response.data;
        setData(responseData);
      } catch (error) {
        console.error('API isteği sırasında hata oluştu:', error);
      }
    }

    fetchData();
  }, []);

  const imageUrls = data.map(item => item.img);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % imageUrls.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + imageUrls.length) % imageUrls.length);
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <Image
          src={imageUrls[currentSlide]}
          alt={`Slide ${currentSlide}`}
          width={800}
          height={400}
        />
      </div>
      <div className="slider-controls">
        <button className="slider-button prev" onClick={prevSlide}>
          Previous
        </button>
        <button className="slider-button next" onClick={nextSlide}>
          Next
        </button>
      </div>

      <style jsx>{`
        .slider-container {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          overflow: hidden;
        }

        .slider {
          position: relative;
          margin-top:20px;
        }

        .slider-button {
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          cursor: pointer;
          font-size: 18px;
          padding: 5px 10px;
          margin: 0 10px;
        }

        .slider-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default Home;


