```javascript
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Definir rutas y sus manejadores
const routes = {
  '/': (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Mini Servidor HTTP</title>
          <style>
            body { font-family: Arial; margin: 40px; background: #f0f0f0; }
            h1 { color: #333; }
            a { display: block; margin: 10px 0; color: #0066cc; text-decoration: none; }
            a:hover { text-decoration: underline; }
            code { background: #ddd; padding: 2px 5px; }
          </style>
        </head>
        <body>
          <h1>🚀 Mini Servidor HTTP - Node.js</h1>
          <p>Bienvenido al servidor. Prueba las siguientes rutas:</p>
          <a href="/api/usuarios">Ver Usuarios (JSON)</a>
          <a href="/api/productos">Ver Productos (JSON)</a>
          <a href="/acerca-de">Acerca de</a>
          <a href="/contacto">Contacto</a>
          <a href="/archivo">Descargar Archivo</a>
          <a href="/no-existe">Página no existe (404)</a>
        </body>
      </html>
    `);
  },

  '/api/usuarios': (req, res) => {
    const usuarios = [
      { id: 1, nombre: 'Juan', email: 'juan@example.com' },
      { id: 2, nombre: 'María', email: 'maria@example.com' },
      { id: 3, nombre: 'Carlos', email: 'carlos@example.com' }
    ];
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(usuarios, null, 2));
  },

  '/api/productos': (req, res) => {
    const productos = [
      { id: 1, nombre: 'Laptop', precio: 999.99, stock: 5 },
      { id: 2, nombre: 'Mouse', precio: 25.99, stock: 50 },
      { id: 3, nombre: 'Teclado', precio: 79.99, stock: 20 }
    ];
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(productos, null, 2));
  },

  '/acerca-de': (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Acerca de</title>
          <style>
            body { font-family: Arial; margin: 40px; background: #f0f0f0; }
            a { color: #0066cc; text-decoration: none; }
          </style>
        </head>
        <body>
          <h1>Acerca de Nosotros</h1>
          <p>Este es un mini servidor HTTP desarrollado con Node.js</p>
          <p>Demuestra funcionalidad core de enrutamiento y manejo de peticiones.</p>
          <a href="/">← Volver al inicio</a>
        </body>
      </html>
    `);
  },

  '/contacto': (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Contacto</title>
          <style>
            body { font-family: Arial; margin: 40px; background: #f0f0f0; }
            a { color: #0066cc; text-decoration: none; }
          </style>
        </head>
        <body>
          <h1>Contacto</h1>
          <p>Email: info@servidor.com</p>
          <p>Teléfono: +1 (555) 123-4567</p>
          <a href="/">← Volver al inicio</a>
        </body>
      </html>
    `);
  },

  '/archivo': (req, res) => {
    const nombreArchivo = 'datos.txt';
    const contenido = 'Este es un archivo de descarga generado dinámicamente.\nFecha: ' + new Date().toISOString();
    
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': `attachment; filename="${nombreArchivo}"`
    });
    res.end(contenido);
  }
};

// Crear servidor HTTP
const servidor = http.createServer((req, res) => {
  // Parsear la URL
  const urlParsed = url.parse(req.url, true);
  const pathname = urlParsed.pathname;

  console.log(`[${new Date().toISOString()}] ${req.method} ${pathname}`);

  // Buscar la ruta coincidente
  if (routes[pathname]) {
    routes[pathname](req, res);
  } else {
    // Ruta no encontrada - 404
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>