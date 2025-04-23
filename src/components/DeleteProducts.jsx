import React from "react";
import { FaTrashAlt } from 'react-icons/fa';



const DeleteProduct = ({ productId, onDelete }) => {
  const handleDelete = () => {
    fetch(`https://taste-town-server.vercel.app/items/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          onDelete(productId);
        }
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  return (
    <button onClick={handleDelete} className="delete-btn">
      <FaTrashAlt /> Delete Product
    </button>
  );
};

export default DeleteProduct;
