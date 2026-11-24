import React from 'react';

function ProductoItem({ producto, onAgregar }) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card h-100 shadow-sm">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text text-muted">{producto.descripcion}</p>
          <p className="fw-bold mt-auto">Precio: ${producto.precio}</p>
          <button
            className="btn btn-primary w-100"
            onClick={() => onAgregar(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductoItem;