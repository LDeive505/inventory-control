import React, { useContext } from 'react';
import Context from '../context/Context';
import '../styles/ChangeLog.css';

export default function ChangeLog() {
  const { logData } = useContext(Context);
  return (
    <div className='change-log-container'>
      <table>
        <thead>
          <tr>
            <th>Ação</th>
            <th>Quantidade</th>
            <th>Produto/Item</th>
            <th>Data e Hora</th>
          </tr>
        </thead>
        <tbody>
          {logData.map((log, index) => (
            <tr key={index}>
              <td>{log.action}</td>
              <td>{log.quantity}</td>
              <td>{log.description}</td>
              <td>{log.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
