import React, { useState } from 'react';
import EditModal from '../Modal/Modal'; // Asumimos que este es tu modal de edición
import DeleteModal from '../Modal/DeleteModal'; // Asegúrate de tener este componente

const ItemTable = ({ item, editItem, deleteItem }) => {
    const { name, price, stock, id, image } = item;
    const [editModalShow, setEditModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);

    return (
        <>
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>{stock}</td>
                <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <i
                        style={{ cursor: 'pointer' }}
                        className="bi bi-pencil-square"
                        onClick={() => setEditModalShow(true)}
                    ></i>
                    <i
                        style={{ cursor: 'pointer' }}
                        className="bi bi-trash3-fill"
                        onClick={() => setDeleteModalShow(true)}
                    ></i>
                </td>
            </tr>

            {/* Edit Modal */}
            <EditModal
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                item={item}
                onSubmit={editItem}
            />

            {/* Delete Modal */}
            <DeleteModal
                show={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                item={item}
                onDelete={deleteItem}
            />
        </>
    );
};

export default ItemTable;
