import { useState } from "react";
import style from '../../App.module.css'

const AddShipment  =(props)=> {
const [state,setState]=useState({
    waybil:'',
    address:'',
    name:'',
    phone:''
});
    

   let handleSubmit = (event) => {
        event.nativeEvent.preventDefault();
        props.createShipment(state.waybil,state.name,state.address,state.phone);
    }

  let  handleChange = (event) => {
      let {name,value} = event.target;
      setState((prevState)=>({
        ...prevState,
        [name]:value,
      }));
    }

        return (
            <form className={style.AddTable} onSubmit={handleSubmit}>

                <div>
                    <input className={style.inputFATable}
                        required
                        type="text"
                        name="waybil"
                        placeholder="Waybil"
                        value={state.waybil}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input className={style.inputFATable}
                        required
                        type="text"
                        name="name"
                        placeholder="customer name"
                        value={state.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input className={style.inputFATable}
                        required
                        type="text"
                        name="address"
                        placeholder="customer address"
                        value={state.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input className={style.inputFATable}
                        required
                        type="number"
                        name="phone"
                        placeholder="customer phone"
                        value={state.phone}
                        onChange={handleChange}
                    />
                </div>
                


                <button className={style.btnFATable} type="submit">add shipment</button>

            </form>
        )
    
}
export default AddShipment;