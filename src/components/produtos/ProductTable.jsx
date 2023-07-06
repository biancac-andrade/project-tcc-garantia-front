import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Checkbox,
  FormControlLabel,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead, TableRow,
  Paper,
  TextField,
  TablePagination
} from '@mui/material';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [selected, setSelected] = useState([]);


  useEffect(() => {
    fetchProducts();
  }, [currentPage, itemsPerPage]);

  const fetchProducts = async () => {
    try {
      // const response = await axios.get('http://localhost:3000/product');
      const response = await axios.get('http://localhost:3000/product', {
      params: {
        page: currentPage,
        limit: itemsPerPage,
      },
    });
      setProducts(response.data);
      setTotalItems(response.data.totalItems);
    } catch (error) {
      console.error('Erro ao buscar os produtos:', error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredProducts = products.filter((product) =>
  product.product_name.toLowerCase().includes(filterValue.toLowerCase())
  );
  
/* const handlePageChange = (event, newPage) => {
  setCurrentPage(newPage + 1); // A API de paginação começa do índice 0, então adicionamos 1 para obter a página correta
  fetchProducts();
}; */
  
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const selectedIds = filteredProducts.map((product) => product._id);
      setSelected(selectedIds);
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (event, id) => {
    if (event.target.checked) {
      setSelected((prevSelected) => [...prevSelected, id]);
    } else {
      setSelected((prevSelected) => prevSelected.filter((selectedId) => selectedId !== id));
    }
  };

  const isSelected = (id) => selected.includes(id);
  
  return (
    <div>
    <TextField
      label="Filtrar por nome do produto"
      value={filterValue}
      onChange={(e) => setFilterValue(e.target.value)}
    />
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
            <TableRow>
            <TableCell>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selected.length === filteredProducts.length}
                      onChange={handleSelectAll}
                      color="primary"
                    />
                  }
                  label="Selecionar Todos"
                />
              </TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Tipo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {filteredProducts.slice(startIndex, endIndex).map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <Checkbox
                    checked={isSelected(product._id)}
                    onChange={(event) => handleSelect(event, product._id)}
                    color="primary"
                  />
                  </TableCell>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <img src={product.image} style={{ width: '50px', height: '50px' }} alt="Imagem do produto" />
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.type[0].name_type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalItems}
        page={currentPage - 1}
        rowsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleItemsPerPageChange}
        rowsPerPageOptions={[10, 25, 50, 100]}
        onChangePage={handlePageChange}
      />
      <div>
        <button onClick={() => setSelected([])}>Limpar Seleção</button>
        <p>{selected.length} {selected.length === 1 ? 'item selecionado' : 'itens selecionados'}</p>
      </div>
      </div>
  );
};

export default ProductTable;
