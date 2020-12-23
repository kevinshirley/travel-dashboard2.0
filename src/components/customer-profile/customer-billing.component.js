import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const BEM_BLOCK = 'c-customer-billing';

function createData(fieldName, value) {
  return { fieldName, value };
}

function BasicTable({ customer }) {
  const rows = [
    createData('Credit Card', ''),
    createData('Paid', ''),
    createData('Unpaid/Due', ''),
    createData('Refunded', ''),
    createData('Gross Income', ''),
  ];

  return (
    <TableContainer className={`${BEM_BLOCK}`} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Invoices/Billing</TableCell>
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
