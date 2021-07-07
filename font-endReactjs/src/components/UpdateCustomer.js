import React ,{ useState, useEffect } from 'react';
import { getAPI,postAPI } from "../services/api";
import "../../src/App.css";
import './main'
import { useSnackbar } from "notistack";

function UpdateCustomer(props) {
    const [info, setInfo] = useState({CustomerName: "", CustomerAge: "",PhoneNumber: "", Address: "",EmailAdress: ""});
    const [user,setUser] = useState(props.dataupdate)
    const { enqueueSnackbar } = useSnackbar();
    const submitUpdateCustomerAPI = (id,data) => {
        return postAPI(`/updateCustomer/${id}`,data)
    };

      useEffect(() => {
        setUser(props.dataupdate);
      }, [props]);

  const onInputChange = event => {
    const { name, value } = event.target;
    setInfo({ ...info, [name]: value });
  };

    const onSubmit = async (id) => {
        const data = new FormData();
        data.append("CustomerName", info.CustomerName);
        data.append("CustomerAge", info.CustomerAge);
        data.append("PhoneNumber", info.PhoneNumber);
        data.append("Address", info.Address);
        data.append("EmailAdress", info.EmailAdress);
        const result = await submitUpdateCustomerAPI(id,data);
      };
      const closeForm=()=>{
          props.closeForm()
      }
    return (
        <div className="panel panel-warning" style={{marginTop: 50 }}>
            <div className="panel-heading">
            <h3 className="panel-title text-center">
              Sửa Khách Hàng
              <span className="fa fa-times-circle text-right ml100" onClick={()=>closeForm()}></span>
            </h3>
            </div> 
          <div className="panel-body">
          <form onSubmit={onSubmit(props.id)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder={user[0].CustomerName}
              name="CustomerName"
              onChange={onInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder={user[0].CustomerAge}
              name="CustomerAge"
              onChange={onInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder={user[0].PhoneNumber}
              name="PhoneNumber"
              onChange={onInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder={user[0].Address}
              name="Address"
              onChange={onInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder={user[0].EmailAdress}
              name="EmailAdress"
              onChange={onInputChange}
            />
          </div>
          <button className="btn btn-warning btn-block">Update User</button>
        </form>
          </div>
          </div>
    );
}

export default UpdateCustomer;