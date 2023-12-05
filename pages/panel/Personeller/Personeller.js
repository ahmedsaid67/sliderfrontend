import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function Personeller() {
  const [personeller, setPersoneller] = useState([]);

  useEffect(() => {
    // API'den personel verilerini al
    fetch('http://127.0.0.1:8000/api/appname/personeller/')
      .then(response => response.json())
      .then(data => setPersoneller(data.results))
      .catch(error => console.error('Hata:', error));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ad</TableCell>
            <TableCell>Soyad</TableCell>
            <TableCell>Unvan</TableCell>
            <TableCell>Personel Türü</TableCell>
            <TableCell>Fotoğraf</TableCell>
            <TableCell>Durum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {personeller.map((personel) => (
            <TableRow key={personel.id}>
              <TableCell>{personel.ad}</TableCell>
              <TableCell>{personel.soyad}</TableCell>
              <TableCell>{personel.unvan}</TableCell>
              <TableCell>{personel.personel_turu.name}</TableCell>
              <TableCell>{personel.img.includes('defaultprofilephoto') ? 'Yok' : 'Mevcut'}</TableCell>
              <TableCell>{personel.durum ? 'Aktif' : 'Pasif'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Personeller;
