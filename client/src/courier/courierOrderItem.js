import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';

function CourierOrderItem(props) {
  const nav = useNavigate();
  const item = props.item;

  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>
        <span className={item.status === 'shipped' ? 'badge bg-info' : 'badge bg-success'}>
          {item.status}
        </span>
      </td>
      <td>{item.date_created.replace(/T/, ' ').substr(0, 16)}</td>
      <td>{item.destination.label}</td>
      <td>₪ {item.total_price}</td>
      <td>{item.products_ar.length}</td>
      <td>
        <button
          onClick={() => {
            nav('/courier/deliveryInfo/' + item._id, { state: item.driver_id });
          }}
          className="btn btn-outline-info"
          title="Info">
          <BsInfoCircle />
        </button>
      </td>
    </tr>
  );
}

export default CourierOrderItem;
