import React, { useState } from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

const rows = [
  {
    id: 'INV-1234',
    date: 'Feb 3, 2023',
    status: 'Refunded',
    customer: {
      initial: 'O',
      name: 'Olivia Ryhe',
      email: 'olivia@email.com',
    },
  },
  // ... other rows omitted for brevity
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const RowMenu = () => {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
};

const OrderTable = () => {
  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  const renderFilters = () => (
    <>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        >
          <Option value="paid">Paid</Option>
          <Option value="pending">Pending</Option>
          <Option value="refunded">Refunded</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Category</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="refund">Refund</Option>
          <Option value="purchase">Purchase</Option>
          <Option value="debit">Debit</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Customer</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="olivia">Olivia Rhye</Option>
          <Option value="steve">Steve Hampton</Option>
          <Option value="ciaran">Ciaran Murray</Option>
          <Option value="marina">Marina Macdonald</Option>
          <Option value="charles">Charles Fulton</Option>
          <Option value="jay">Jay Hoper</Option>
        </Select>
      </FormControl>
    </>
  );

  return (
    <>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: 'flex', sm: 'none' },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for order</FormLabel>
          <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== rows.length
                  }
                  checked={selected.length === rows.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked ? rows.map((row) => row.id) : [],
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === rows.length
                      ? 'primary'
                      : undefined
                  }
                  sx={{ verticalAlign: 'text-bottom' }}
                />
              </th>
              <th style={{ width: 120, padding: '12px 6px' }}>
                <Link
                  underline="none"
                  color="neutral"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Typography
                    variant="body2"
                    color="neutral"
                    weight="medium"
                    sx={{ marginRight: 1 }}
                  >
                    Date
                  </Typography>
                  <ArrowDropDownIcon
                    fontSize="small"
                    sx={{ color: 'neutral' }}
                  />
                </Link>
              </th>
              <th style={{ width: 120, padding: '12px 6px' }}>
                <Typography
                  variant="body2"
                  color="neutral"
                  weight="medium"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Typography variant="body2" color="neutral" weight="medium">
                    Status
                  </Typography>
                </Typography>
              </th>
              <th style={{ minWidth: 160, padding: '12px 6px' }}>
                <Typography
                  variant="body2"
                  color="neutral"
                  weight="medium"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Typography variant="body2" color="neutral" weight="medium">
                    Customer
                  </Typography>
                </Typography>
              </th>
              <th style={{ width: 48, padding: '12px 6px' }}></th>
            </tr>
          </thead>
          <tbody>
            {stableSort(rows, getComparator(order, 'date')).map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: 'center', padding: '4px 6px' }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(row.id)}
                    color="primary"
                    sx={{ verticalAlign: 'text-bottom' }}
                    onChange={(event) => {
                      const selectedIndex = selected.indexOf(row.id);
                      let newSelected = [];

                      if (selectedIndex === -1) {
                        newSelected = newSelected.concat(selected, row.id);
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
                    }}
                  />
                </td>
                <td style={{ padding: '4px 6px' }}>{row.date}</td>
                <td style={{ padding: '4px 6px' }}>
                  <Chip
                    size="sm"
                    label={row.status}
                    color={row.status === 'Refunded' ? 'danger' : undefined}
                  />
                </td>
                <td style={{ padding: '4px 6px' }}>
                  <Avatar size="sm" name={row.customer.name} />
                  <Typography
                    variant="body2"
                    color="neutral"
                    sx={{ marginLeft: 'xs' }}
                  >
                    {row.customer.name}
                  </Typography>
                </td>
                <td style={{ textAlign: 'center', padding: '4px 6px' }}>
                  <RowMenu />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box sx={{ flexGrow: 1 }} />
      <Sheet
        sx={{
          py: 2,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 1.5,
          '& > *': {
            whiteSpace: 'nowrap',
          },
        }}
      >
        <Typography variant="body2" color="neutral">
          {selected.length} selected
        </Typography>
        <Button size="sm" color="neutral" onClick={() => setSelected([])}>
          Clear selection
        </Button>
        <IconButton size="sm" onClick={() => console.log('Refresh')}>
          <AutorenewRoundedIcon />
        </IconButton>
        <Dropdown>
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            slots={{ label: Typography }}
            slotProps={{ label: { variant: 'body2', color: 'neutral' } }}
          >
            Actions
          </Button>
          <Menu size="sm" sx={{ minWidth: 160 }}>
            <MenuItem>Export</MenuItem>
            <MenuItem>Print</MenuItem>
            <MenuItem>Archive</MenuItem>
          </Menu>
        </Dropdown>
        <Button size="sm" variant="contained" onClick={() => console.log('Bulk actions')}>
          Apply
        </Button>
      </Sheet>
    </>
  );
};

export default OrderTable;
