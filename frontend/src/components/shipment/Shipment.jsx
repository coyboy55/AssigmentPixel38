import { useState } from "react";
import style1 from '../../App.module.css'


const Shipment = (props)=> {

const[state,setState]=useState({
      edit_mode: false,
        id: props.id,
        waybil: props.waybil,
        name: props.name,
        address: props.address,
        phone: props.phone,
   
})


   const toggleEditMode = () => {
        let edit_mode = !state.edit_mode;
        setState((prevState)=>({
            ...prevState,
            edit_mode,
          }));
    }

    const handleChange = (event) => {
        let {  name,value } = event.target;
     setState((prevState)=>({
            ...prevState,
            [name]:value,
          }));
    }

    

const    handleSubmit = (event) => {
        event.nativeEvent.preventDefault();
        let { id, updateShipment } = props;
        let {waybil,name,address,phone}=state;
        updateShipment(id,waybil,name,address,phone);
        toggleEditMode();
    }
    const    handleDelete = () => {
  
        let { id, deleteShipment } = props;
       
        deleteShipment(id);
       
    }

   const handleReset = (event) => {
        event.nativeEvent.preventDefault();
        let { waybil,name,address,phone  } = props;
        setState({ waybil,name,address,phone });
        toggleEditMode();
    }

   const renderEditMode = () => {
   
        return (
            <div>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    <div>
                        <input className={style1.inputFATable}
                            required
                            type="text"
                            name="waybil"
                            placeholder="Waybil"
                            value={state.waybil}
                            onChange={handleChange}
                        />
                        
                    </div>
                    <div>
                        <input className={style1.inputFATable}
                            required
                            type="text"
                            name="name"
                            placeholder="Customer Name"
                            value={state.name}
                            onChange={handleChange}
                        />
                        
                    </div>
                    <div>
                        <input className={style1.inputFATable}
                            required
                            type="text"
                            name="address"
                            placeholder="Customer Address"
                            value={state.address}
                            onChange={handleChange}
                        />
                        
                    </div>
                      <div>
                        <input className={style1.inputFATable}
                            required
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={state.phone}
                            onChange={handleChange}
                        />
                        
                    </div>
                    

                    <button  className={style1.btnFATable}  type="reset" >cancel</button>
                    <button  className={style1.btnFATable} type="submit">edit</button>
                </form>
            </div>
        )
    }

   const renderViewMode = () => {
        let {waybil,name,address,phone } = props;
        return (
            <div>
                <p>waybil :<span style={{color:"white"}}>{waybil}</span></p>
                <p>customer name :<span style={{color:"white"}}>{name}</span></p>

                <p>customer address :<span style={{color:"white"}}>{address}</span></p>
                <p>customer phone :<span style={{color:"white"}}>{phone}</span></p>


        
                <button className={style1.btnFATable} onClick={handleDelete} >x</button>
          
                
          <button className={style1.btnFATable} onClick={toggleEditMode}>edit</button>
            </div>
        )
    }

        let { edit_mode } = state;

        if (edit_mode) return renderEditMode();
        else return renderViewMode();
    
}
export default Shipment;