import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@material-ui/core";
import TablePagination from '@material-ui/core/TablePagination';
import { useSnackbar } from "notistack";
import { getAPI} from "../services/api";
import AddCustomer from "./AddCustomer";
import UpdateCustomer from "./UpdateCustomer";
import { withStyles} from '@material-ui/core/styles';
import "../../src/App.css";

const useStyles = makeStyles((theme) => ({
    selected: {
        color: '#FFFFFF',
        fontSize: 18
    },
}));

const styles = makeStyles(() => ({
  input: {
    marginTop: 20,
  },
  button: {
    marginTop: 20,
  },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 20,
    },
  }))(TableCell);

const getCustomersAPI = () => {
  return getAPI("/allCustomer");
};
const getCustomerById = (id) => {
  return getAPI(`/getCustomer/${id}`)
}
function Customers(props) {
  const secondClasses = useStyles();
  const classes = styles();
  const { enqueueSnackbar } = useSnackbar();
  const [customers, setCustomers] = useState([]);
  const [dataupdate, setDataupdate] = useState({ CustomerName: "", CustomerAge: "",PhoneNumber: "", Address: "",EmailAdress: "" })
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [page, setPage] = React.useState(0); 
  const [idupdate,setIdupdate] = useState()
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [displayForm, setDisplayForm] = useState(false);
  const [typeform,setTypeform] = useState([false]);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const requestData = async () => {
      try {
        const result = await getCustomersAPI();
        if (result.status === 200) {
          setCustomers(result.data);
        }
      } catch (e) {
        enqueueSnackbar("Có lỗi xảy ra!", { variant: "error" });
      }
    };
    requestData();
  }, []);

  const UpdateCustomers = async (id) => {
    setIdupdate(id)
    const res = await getCustomerById(id)
    setDataupdate(res.data)
    onFormUpdate();
  };

  const onFormAdd= () => {
    displayForm ? setDisplayForm(false) : setDisplayForm(true)
    setTypeform(true)
  };
  
  const onFormUpdate= () => {
    displayForm ? setDisplayForm(false) : setDisplayForm(true)
    setTypeform(false)
  };

  const closeForm= () => {
    displayForm ? setDisplayForm(false) : setDisplayForm(true)
  };

  const deleteCustomer= async (id) =>{
    const userResponse = window.confirm("Are you sure you want to delete it?");
    if (userResponse) {
        const result = await fetch(`http://localhost:5555/deleteCustomer/${id}`, {
        method: "DELETE",
      });
      if (result.status === 200) {
        enqueueSnackbar("Xóa thành công!", { variant: "success" });
      } else {
        enqueueSnackbar("Xóa thất bại!", { variant: "error" });
      }
      console.log(result)
      await getCustomersAPI()
      .then((response) => {
        console.log(response.data);
        setCustomers(response.data);
      })
      .catch((error) => console.log(error));
    }
  }

  const reload =async () => {
    await getCustomersAPI()
      .then((response) => {
        console.log(response.data);
        setCustomers(response.data);
      })
      .catch((error) => console.log(error));
  }

  const elmFormAdd = displayForm === true && typeform === true ? <AddCustomer closeForm={() => closeForm()} reload = {()=> reload()}/> : '';
  const elmFormUpdate = displayForm === true && typeform === false ? <UpdateCustomer closeForm={() => closeForm()} dataupdate={dataupdate} id = {idupdate}/> : '';
  return (
    <div className="container">
    <div className="row" style={{marginTop: 100}}>
        <div className={displayForm === true && typeform === true ?"col-xs-4 col-sm-4 col-md-4 col-lg-4":''}>{elmFormAdd}</div>
        <div className={displayForm === true && typeform === false ?"col-xs-4 col-sm-4 col-md-4 col-lg-4":''}>{elmFormUpdate}</div>
        <div className={displayForm ===true? "col-xs-8 col-sm-8 col-md-8 col-lg-8": "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
      <TableContainer component={Paper}>
      <h1 className="heading-title text-center" style={{fontSize: 40}}>
        Danh Sách Khách Hàng
      </h1>
        <Table style={{height: 300 }} className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow >
            <StyledTableCell style={{fontSize: 15}} align="center">Tên Khách Hàng</StyledTableCell>
            <StyledTableCell style={{fontSize: 15}} align="center">Tuổi Khách Hàng</StyledTableCell>
            <StyledTableCell style={{fontSize: 15}} align="center">Số Điện Thoại</StyledTableCell>
            <StyledTableCell style={{fontSize: 15}} align="center">Địa Chỉ</StyledTableCell>
            <StyledTableCell style={{fontSize: 15}} align="center">Email</StyledTableCell>
            <StyledTableCell style={{fontSize: 15}} align="center">Action</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
            {customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.CustomerID}>
                <TableCell style={{fontSize: 15}} align="center" >{row.CustomerName}</TableCell>
                <TableCell style={{fontSize: 15}} align="center">{row.CustomerAge}</TableCell>
                <TableCell style={{fontSize: 15}} align="center">{row.PhoneNumber}</TableCell>
                <TableCell style={{fontSize: 15}} align="center">{row.Address}</TableCell>
                <TableCell style={{fontSize: 15}} align="center">{row.EmailAdress}</TableCell>
                <TableCell>
                    <button onClick={()=>UpdateCustomers(row.CustomerID)}
                            type="button"
                            className="btn btn-warning">
                            <span className="fas fa-edit mr-5" ></span>Sửa
                        </button>
                        &nbsp;
                        <button
                            data-toggle="confirmation"
                            onClick={()=>deleteCustomer(row.CustomerID)}
                            type="button" className="btn btn-danger btn-default" >
                            <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow style={{marginLeft: 100}} align="center">
                <TableCell>
                <button align="center" className="btn btn-primary" onClick={() => onFormAdd()}>
                     <span className="fa fa-plus mr-5"></span>Thêm Khách Hàng
                </button>
                </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className={secondClasses.selected}
        rowsPerPageOptions={[4, 5, 100]}
        component="div"
        count={customers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
    </div>
    </div>
  );
}

export default Customers;
