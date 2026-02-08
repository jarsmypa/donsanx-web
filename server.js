const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware para loguear solicitudes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Servir Sanity Studio en /admin
app.use('/admin', express.static(path.join(__dirname, 'studio/dist'), {
  index: 'index.html'
}));

// Redirigir todas las rutas bajo /admin al index.html de studio
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'studio/dist/index.html'));
});

// Servir la aplicación principal (donsanx.me)
app.use(express.static(path.join(__dirname, 'DONSANX WEB/dist')));

// Manejo para rutas SPA (react-router)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'DONSANX WEB/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`✓ Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`✓ Sitio principal: http://localhost:${PORT}/`);
  console.log(`✓ Sanity Studio: http://localhost:${PORT}/admin`);
});
