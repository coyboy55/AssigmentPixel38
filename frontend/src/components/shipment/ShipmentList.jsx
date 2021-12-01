
import Shipment from './Shipment';
import { Transition, animated } from 'react-spring';
import style1 from '../../App.module.css'

 const ShipmentList = (props) => {
  

        let { shipments ,updateShipment,deleteShipment} = props;

        return (
          
            <Transition
            items={shipments}
            keys={shipment => shipment.id}
            from={{ transform: "translate3d(-100px,0,0)" }}
            enter={{ transform: "translate3d(0,0px,0)" }}
            leave={{ transform: "translate3d(-100px,0,0)" }}
        >
            {(style, shipment) => (
           <animated.div className={style1.ListFA} style={style}>
                    <Shipment
                        key={shipment.id}
                        id={shipment.id}
                        waybil={shipment.waybil}
                        address={shipment.customer_address}
                        name={shipment.customer_name}
                        phone={shipment.phone_number}
                       updateShipment={updateShipment}
                       deleteShipment={deleteShipment}

                    />
                </animated.div>
            )}
        </Transition>
     
        )
    
}

export default ShipmentList