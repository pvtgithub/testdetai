import React from 'react';
import {useState,useEffect} from 'react';
import { postAPI } from "../services/api";
import { TextField, Button } from '@material-ui/core';
import "../../src/App.css";
import { useSnackbar } from "notistack";

const submitAddCustomerAPI = (data) => {
    return postAPI("/addCustomer", data);
  };
function AddCustomer(props) {
    const [info, setInfo] = useState({ CustomerName: "", CustomerAge: "",PhoneNumber: "", Address: "",EmailAdress: "" });
    const { enqueueSnackbar } = useSnackbar();


    const onValueChangeName = (event) => {
      setInfo((prev) => ({ ...prev, CustomerName: event.target.value }));
      };
    
    const onValueChangeAge = (event)=>{
        setInfo((prev) => ({ ...prev, CustomerAge: event.target.value }));
    }

    const onValueChangePhone = (event) =>{
        setInfo((prev) => ({ ...prev, PhoneNumber: event.target.value }));
    }

    const onValueChangeAdress = (event) =>{
        setInfo((prev) => ({ ...prev, Address: event.target.value }));
    }

    const onValueChangeEmailAdress = (event) =>{  
        setInfo((prev) => ({ ...prev, EmailAdress: event.target.value }));
    }

    const onSubmit = async () =>{
        const data = new FormData();
        data.append("CustomerName", info.CustomerName);
        data.append("CustomerAge", info.CustomerAge);
        data.append("PhoneNumber", info.PhoneNumber);
        data.append("Address", info.Address);
        data.append("EmailAdress", info.EmailAdress);
        const result = await submitAddCustomerAPI(data);
        if (result.status === 200) {
          enqueueSnackbar("Thêm thành công!", { variant: "success" });
        } else {
          enqueueSnackbar("Thêm thất bại!", { variant: "error" });
        }
        reload()
        closeForm()
    }
    const reload=()=>{
      props.reload();
    }
    const closeForm=()=>{
      props.closeForm();
  }
    return (
        <div className="panel panel-warning" style={{marginTop: 50 }}>
            <div className="panel-heading">
            <h3 className="panel-title text-center">
              Thêm Khách Hàng
              <span className="fa fa-times-circle text-right ml100" onClick={()=>closeForm()}></span>
            </h3>
            </div> 
          <div className="panel-body">
              <div className="form-group">
                <TextField className="form-control" label="Tên Khách Hàng" variant="outlined" onChange={onValueChangeName}/>
                <TextField style={{marginTop: 20}} className="form-control" label="Tuổi Khách Hàng" variant="outlined" onChange={onValueChangeAge}/>
                <TextField style={{marginTop: 20}} className="form-control" label="Số Điện Thoại" variant="outlined" onChange={onValueChangePhone}/>
                <TextField style={{marginTop: 20}} className="form-control" label="Địa Chỉ" variant="outlined" onChange={onValueChangeAdress}/>
                <TextField style={{marginTop: 20}} className="form-control" label="Email" variant="outlined" onChange={onValueChangeEmailAdress}/>
              </div>
              <div className="text-center">
                <Button className="btn btn-warning mr5" color="primary" variant="contained" onClick={onSubmit}> 
                <span className="fa fa-plus "></span>Lưu lại
                </Button>
                <Button className="btn btn-warning mr5" color="secondary" variant="contained" onClick={closeForm}
                ><span className = "fa fa-close "></span>Hủy bỏ
                </Button>
              </div>
          </div>
          </div>
    );
}

export default AddCustomer;