import React from 'react';


function Admin({ products, setproducts }) {
  
  const handleDelete = (id) => {
    fetch(`https://taste-town-server.vercel.app/items/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to delete item");
        }
        setproducts(prev => prev.filter(product => product.id !== id));
      })
      .catch(err => console.error("Error deleting product:", err));
  };

  return (
    <div className="admin-panel">
      <h2 className="admin-title">DELETE </h2>
      {products.length === 0 ? (
        <p className="no-products">No products available.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>
                  <button 
                    className="delete-button" 
                    onClick={() => handleDelete(product.id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Admin;
