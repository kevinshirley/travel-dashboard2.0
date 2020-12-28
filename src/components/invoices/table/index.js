import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as moment from 'moment';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Avatar from 'src/components/material-ui/avatar';
import Link from 'src/components/common/link';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { selectShouldResetItinerariesTable } from 'src/store/selectors/common';
import Spinner from 'src/components/common/spinner';
import { ARROW_FORWARD_ICON, SPACING } from 'src/components/material-ui/icons';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { firstLetterOfEach } from 'src/utils/string';

function createData(id, firstName, lastName, email, status, amount, date) {
  return { id, firstName, lastName, email, status, amount, date };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'remove', numeric: false, disablePadding: true, label: '' },
  { id: 'customer', numeric: false, disablePadding: true, label: 'Customer' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'amount', numeric: false, disablePadding: false, label: 'Amount' },
  { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'view', numeric: false, disablePadding: false, label: 'View' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { deleteItinerary, isDeleting, numSelected, selected } = props;

  const [status, setStatus] = React.useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color='inherit' variant='subtitle1' component='div'>
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={`${BEM_BLOCK}__status-select`} variant='h6' id='tableTitle' component='div'>
          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel id='demo-simple-select-outlined-label'>Status</InputLabel>
            <Select
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              value={status}
              onChange={handleChange}
              label='Status'
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value='paid'>Paid</MenuItem>
              <MenuItem value='pending'>Pending</MenuItem>
              <MenuItem value='canceled'>Canceled</MenuItem>
            </Select>
          </FormControl>
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip className='c-itineraries-table__delete-tooltip' disabled={isDeleting} onClick={() => deleteItinerary(selected)} title='Delete'>
          <IconButton aria-label='delete'>
            {isDeleting ? <Spinner /> : <DeleteIcon />}
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton aria-label='filter list'>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  deleteItinerary: PropTypes.func,
  isDeleting: PropTypes.bool,
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const BEM_BLOCK = 'c-invoices-table';

function EnhancedTable({ deleteItinerary, isDeleting, itineraries, resetItinerariesTable }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('date');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const shouldResetItinerariesTable = useSelector(selectShouldResetItinerariesTable);

  // const rows = itineraries && itineraries.map(trip => {
  //   return createItineraryData(trip.tripInformation.coverImage.location, trip.tripInformation.title, `${trip.tripInformation.location}, ${trip.tripInformation.country}`, trip.createdAt, trip.itinerary_id);
  // });

  const rows = [
    createData('5ecb868d0f437390ef3ac62c', 'Nancy', 'Doe', 'nancydoe@gmail.com', 'paid', '253.76', '27/12/2020'),
    createData('5ecb868d0f437390ef3ws34e', 'Bobby', 'Doe', 'bobbydoe@gmail.com', 'canceled', '433.22', '21/11/2020'),
    createData('5ecb868d0f437390ef3cf87q', 'Amanda', 'Doe', 'amandadoe@gmail.com', 'canceled', '365.85', '12/10/2020'),
    createData('5ecb868d0f437390ef3bt64m', 'Jared', 'Doe', 'jareddoe@gmail.com', 'paid', '734.88', '17/11/2020'),
    createData('5ecb868d0f437390ef3ac61s', 'Nancy', 'Doe', 'nancydoe@gmail.com', 'paid', '253.76', '27/12/2020'),
    createData('5ecb868d0f437390ef3ws37h', 'Bobby', 'Doe', 'bobbydoe@gmail.com', 'canceled', '433.22', '21/11/2020'),
    createData('5ecb868d0f437390ef3cf89k', 'Amanda', 'Doe', 'amandadoe@gmail.com', 'canceled', '365.85', '12/10/2020'),
    createData('5ecb868d0f437390ef3bt63n', 'Jared', 'Doe', 'jareddoe@gmail.com', 'paid', '734.88', '17/11/2020'),
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleSelectedItinerary = id => {
    Router.push({
      pathname: '/manage-itinerary',
      query: { id },
    });
  };

  useEffect(() => {
    if (shouldResetItinerariesTable) {
      setSelected([]);
      resetItinerariesTable(false);
    }
  }, [shouldResetItinerariesTable]);

  return (
    <div className={`${BEM_BLOCK}`}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          deleteItinerary={deleteItinerary}
          isDeleting={isDeleting}
          numSelected={selected.length}
          selected={selected}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            size={dense ? 'small' : 'medium'}
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const name = `${row.firstName} ${row.lastName}`;

                  return (
                    <TableRow
                      hover
                      // onClick={() => handleSelectedItinerary(row.id)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      className='single-itinerary'
                    >
                      <TableCell align='left'>
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onClick={(event) => handleClick(event, row.id)}
                        />
                      </TableCell>
                      <TableCell component='th' id={labelId} scope='row' padding='none'>
                        <div className={`${BEM_BLOCK}__customer-cell`}>
                          <div>
                            <Link href={`/invoices/${row.id}`} className={`${BEM_BLOCK}__invoice-avatar`}>
                              <Avatar alt={name}>{firstLetterOfEach(name)}</Avatar>
                            </Link>
                          </div>
                          {SPACING}
                          {SPACING}
                          <div>
                            <h3>{row.firstName} {row.lastName}</h3>
                            <span>{row.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align='left'>{row.status}</TableCell>
                      <TableCell align='left'>${row.amount}</TableCell>
                      <TableCell align='left'>{row.id}</TableCell>
                      <TableCell align='left'>{row.date}</TableCell>
                      <TableCell align='left'>
                        <Link href={`/invoices/${row.id}`} className={`${BEM_BLOCK}__view-invoice`}>
                          {ARROW_FORWARD_ICON}
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label='Dense padding'
      />
    </div>
  );
}

EnhancedTable.propTypes = {
  isDeleting: PropTypes.bool,
};

export default EnhancedTable;
