import React, { Component } from 'react';
import ProductoItem from './ProductoItem';

class CatalogoProductos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [
        {
          id: 1,
          nombre: 'Notebook Pro 14',
          descripcion: 'Procesador moderno, 16GB RAM y disco SSD de 512GB.',
          precio: 650000
        },
        {
          id: 2,
          nombre: 'Teclado Mecánico',
          descripcion: 'Teclado retroiluminado compacto para programación.',
          precio: 45000
        },
        {
          id: 3,
          nombre: 'Monitor Full HD 24"',
          descripcion: 'Pantalla IPS antirreflejo de alta definición.',
          precio: 130000
        }
      ],
      carrito: []
    };
  }

  agregarAlCarrito = (productoSeleccionado) => {
    this.setState((prevState) => ({
      carrito: [...prevState.carrito, productoSeleccionado]
    }));
  };

  vaciarCarrito = () => {
    this.setState({
      carrito: []
    });
  };

  render() {
    const total = this.state.carrito.reduce(
      (acumulador, item) => acumulador + item.precio,
      0
    );

    return (
      <div className="container mt-4">
        <h2 className="mb-3">Ejercicio 1: Catálogo de Productos</h2>

        <div className="row">
          {this.state.productos.map((prod) => (
            <ProductoItem
              key={prod.id}
              producto={prod}
              onAgregar={this.agregarAlCarrito}
            />
          ))}
        </div>

        <div className="card mt-4 shadow-sm">
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
            <span>Carrito de Compras ({this.state.carrito.length} productos)</span>
            {this.state.carrito.length > 0 && (
              <button
                className="btn btn-sm btn-outline-light"
                onClick={this.vaciarCarrito}
              >
                Vaciar carrito
              </button>
            )}
          </div>
          <div className="card-body">
            {this.state.carrito.length === 0 ? (
              <p className="text-muted mb-0">El carrito está vacío. Agrega un producto arriba.</p>
            ) : (
              <div>
                <ul className="list-group mb-3">
                  {this.state.carrito.map((item, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>{item.nombre}</span>
                      <span className="fw-bold">${item.precio}</span>
                    </li>
                  ))}
                </ul>
                <h5 className="text-end mb-0">Total a pagar: ${total}</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CatalogoProductos;