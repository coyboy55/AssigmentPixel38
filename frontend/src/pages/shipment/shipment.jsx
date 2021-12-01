import { useContext, useState } from "react";

import AddShipment from "../../components/shipment/AddShipment";
import ShipmentList from "../../components/shipment/ShipmentList";
import style1 from "../../App.module.css";
import "../../style.css";

import { gql, useQuery, useMutation, useApolloClient } from "@apollo/client";
import { toast } from "react-toastify";
import SessionContext from "../../components/session/SessionContext";

const CreateShipment = gql`
  mutation createShipment(
    $waybil: String!
    $customer_name: String!
    $customer_address: String!
    $phone_number: String!
  ) {
    createShipment(
      waybil: $waybil
      customer_name: $customer_name
      customer_address: $customer_address
      phone_number: $phone_number
    ) {
      id
    }
  }
`;

const UpdateShipment = gql`
  mutation updateShipment(
    $id: ID!
    $waybil: String!
    $customer_name: String!
    $customer_address: String!
    $phone_number: String!
  ) {
    updateShipment(
      id: $id
      waybil: $waybil
      customer_name: $customer_name
      customer_address: $customer_address
      phone_number: $phone_number
    ) {
      id
    }
  }
`;

const GetMyShipment = gql`
  query {
    me {
      shipment {
        id
        waybil
        customer_address
        customer_name
        phone_number
      }
    }
  }
`;

const DeleteShipment = gql`
  mutation deleteShipment($id: ID!) {
    deleteShipment(id: $id) {
      id
    }
  }
`;

const Shipment = (props) => {
  const [shipment, setShipment] = useState([]);

  const client = useApolloClient();
  const [CREATESHIPMENT, { loading: loading1, error: error1 }] = useMutation(
    CreateShipment,
    {
      onCompleted: () => {
        refetch();
      },
    }
  );
  const [UPDATESHIPMENT, { loading: loading2, error: error2 }] = useMutation(
    UpdateShipment,
    {
      onCompleted: () => {
        refetch();
      },
    }
  );
  const [DELETESHIPMENT, { loading: loading3, error: error4 }] = useMutation(
    DeleteShipment,
    {
      onCompleted: () => {
        refetch();
      },
    }
  );

  const { loading, error, refetch } = useQuery(GetMyShipment, {
    onCompleted: (data) => {
      setShipment(data.me.shipment);
    },
  });
  const {
    actions: { logout },
  } = useContext(SessionContext);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  //CreateShipment
  let createShipment = async (waybil, name, address, phone) => {
    CREATESHIPMENT({
      variables: {
        waybil: waybil,
        customer_name: name,
        customer_address: address,
        phone_number: phone,
      },
    });
    if (loading1) return "Loading...";
    if (error1) return `Error! ${error1.message}`;
  };

// updateShipment
  let updateShipment = async (id, waybil, name, address, phone) => {
    console.log({ id, waybil, name, address, phone });
    UPDATESHIPMENT({
      variables: {
        id: id,
        waybil: waybil,
        customer_name: name,
        customer_address: address,
        phone_number: phone,
      },
    });
    if (loading2) return "Loading...";
    if (error2) return `Error! ${error1.message}`;
  };

  //deleteShipment
  let deleteShipment = (id) => {
    let acc = window.confirm("are you sure");
    if (acc) {
      DELETESHIPMENT({ variables: { id: id } });
    }
  };

  return (
    <div className="patientprofile">
      <div className="header">
        <h2>SHIPMENT DASHBOARD</h2>
        <button
          onClick={() => {
            logout();
            client.clearStore();
          }}
        >
          log out
        </button>
      </div>
      <center>
        <AddShipment createShipment={createShipment} />
      </center>
      <center className={style1.centerList}>
        <ShipmentList
          shipments={shipment}
          updateShipment={updateShipment}
          deleteShipment={deleteShipment}
        />
      </center>
    </div>
  );
};

export default Shipment;
