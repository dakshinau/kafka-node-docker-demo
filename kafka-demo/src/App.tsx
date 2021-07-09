import react, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import request from './request';
import { io } from "socket.io-client";


const statuses = ['new', 'pending', 'verify-shipment', 'unloading', 'delivered'];

const Shipment = ({ shipment }: { shipment: any }) => {


  return <li className="list-group-item">
    {shipment.reference}
    <select className="form-control" defaultValue={shipment.status} onChange={({ target }) => {
      request.post(`/shipments/${shipment.reference}/updateStatus`, { reference: shipment.reference, status: target.value })
        .catch((e) => {
          console.log(e);
        })
    }}>
      {statuses.map(status => <option value={status}>{status}</option>)}
    </select>
  </li>
}

const Consumer = ({ socket, title }: { socket: any, title: any }) => {
  const [recievedEvents, setRecievedEvents] = useState<any>([]);
  socket.on("connect_error", () => {
    // revert to classic upgrade
    socket.io.opts.transports = ["polling", "websocket"];
  });
  socket.on("status", (args: any) => {
    setRecievedEvents((allEvents: any) => {
      return [...recievedEvents, JSON.parse(args.value)];
    });
  });

  return <div className="col-4">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {recievedEvents.map((rEvent: any) => {
          return <div>{rEvent.reference} - {rEvent.status}</div>
        })}
      </div>
    </div>
  </div>
}
const consumers = [
  {
    title: 'Consumer (Transporeon)',
    socket: io('localhost:9001'),
  },
  {
    title: 'Consumer 2 (ERP)',
    socket: io('localhost:9002'),
  }
];
function App() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    request.get('/shipments')
      .then((res) => {
        setShipments(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (<div className="spinner-grow" role="status">
      <span className="sr-only">Loading...</span>
    </div>);
  }

  return (
    <div className="row">
      <div className="col-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Admin App</h5>
            <h6 className="card-title">Shipments</h6>
            <ul className="list-group">
              {shipments.map(shipment => <Shipment shipment={shipment} />)}
            </ul>
          </div>
        </div>
      </div>

      {consumers.map(cn => <Consumer socket={cn.socket} title={cn.title} />)}

    </div>
  );
}

export default App;
function useMemo(arg0: () => { title: string; socket: import("socket.io-client").Socket<import("socket.io-client/build/typed-events").DefaultEventsMap, import("socket.io-client/build/typed-events").DefaultEventsMap>; }[], arg1: never[]) {
  throw new Error('Function not implemented.');
}

function useCallback(arg0: () => { title: string; socket: import("socket.io-client").Socket<import("socket.io-client/build/typed-events").DefaultEventsMap, import("socket.io-client/build/typed-events").DefaultEventsMap>; }[], arg1: never[]) {
  throw new Error('Function not implemented.');
}

