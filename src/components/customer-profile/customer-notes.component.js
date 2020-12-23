import React from 'react';
import { isEmpty } from 'ramda';
import * as moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(fieldName, value) {
  return { fieldName, value };
}

function BasicTable({ descendantCustomerNotes }) {
  let rows = [];

  if (!isEmpty(descendantCustomerNotes)) {
    descendantCustomerNotes.map((noteItem) => {
      const data = createData(noteItem.createdAt, noteItem.note);
      rows.push(data);
    });
  }

  return (
    <TableContainer className='' component={Paper}>
      <Table className='' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Notes</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {moment(row.fieldName).format('L')}
                <br/>
                {moment(row.fieldName).format('LT')}
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">{row.value}</TableCell>
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
