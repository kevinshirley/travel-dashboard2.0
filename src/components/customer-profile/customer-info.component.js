import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { LensTwoTone } from '@material-ui/icons';

function createData(fieldName, value) {
  return { fieldName, value };
}

function BasicTable({ customer }) {
  let rows;
  if (customer.country) {
    rows = [
      createData('Email', customer.email),
      createData('Phone number', customer.phoneNumber),
      createData('Country', ''),
      createData('State/Region', ''),
      createData('Address 1', ''),
      createData('Address 2', ''),
    ];
  } else {
    rows = [
      createData('Email', customer.email),
      createData('Phone number', customer.phoneNumber),
    ];
  }

  return (
    <TableContainer className='' component={Paper}>
      <Table className='' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Customer info</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.fieldName}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTable;
