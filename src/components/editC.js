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
      fontSize: 14,
    },
  }))(TableCell);
function editC(props){
    
    const classes = styles();
    const[user,setUser] = useState({CustomerName: "", CustomerAge: "",PhoneNumber: "", Address: "",EmailAdress: ""})
    return(
        <div>
            <TableContainer component={Paper}>
      <h2 className="heading-title text-center">
        Danh Sách Khách Hàng
      </h2>
        <Table style={{height: 300 }} className={classes.table} aria-label="simple table">
          <TableHead>
          <TableRow>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">Tên Khách Hàng</StyledTableCell>
            <StyledTableCell align="center">Tuổi Khách Hàng</StyledTableCell>
            <StyledTableCell align="center">Số Điện Thoại</StyledTableCell>
            <StyledTableCell align="center">Địa Chỉ</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
            {user.map((row) => (
              <TableRow key={row.CustomerID}>
                <TableCell align="center">{row.CustomerID}</TableCell>
                <TableCell align="center">{row.CustomerName}</TableCell>
                <TableCell align="center">{row.CustomerAge}</TableCell>
                <TableCell align="center">{row.PhoneNumber}</TableCell>
                <TableCell align="center">{row.Address}</TableCell>
                <TableCell align="center">{row.EmailAdress}</TableCell>
                <TableCell>
                    <button onClick={()=>UpdateCustomers(row.CustomerID)}
                            type="button"
                            className="btn btn-warning">
                            <span className="fa fa-pencil mr-5" ></span>Sửa
                        </button>
                        &nbsp;
                        <button
                            onClick={()=>deleteCustomer(row.CustomerID)}
                            type="button" className="btn btn-danger">
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
        </div>
    )
}
export default editC;