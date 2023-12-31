import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import {
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
} from '@mui/material';

const ProductTable = () => {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  //const [products, setProducts] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [selected, setSelected] = useState([]);
  const [statuses, setStatuses] = useState([]);


  const fetchStatuses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/status');
      setStatuses(response.data);
    } catch (error) {
      console.error('Erro ao buscar os status:', error);
    }
  };


  const navigate = useNavigate(); // Obtenha o objeto history

  useEffect(() => {
    fetchProducts();
    fetchStatuses();
  }, [currentPage, itemsPerPage, id]);

  const fetchProducts = async () => {
    try {
      // const response = await axios.get('http://localhost:3000/product');
      const response = await axios.get('http://localhost:3000/product', {
        params: {
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      const { products: fetchedProducts, totalItems } = response.data;

      setProducts(fetchedProducts);
      setTotalItems(totalItems);
      // setProducts(response.data.data);
      // setTotalItems(response.data.totalItems);
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

  // const filteredProducts = products.filter((product) =>
  // product.product_name.toLowerCase().includes(filterValue.toLowerCase())
  // );

  /*   const filteredProducts = products !== null ? products.filter((product) =>
  product.product_name.toLowerCase().includes(filterValue.toLowerCase())
) : []; */

  const filteredProducts =
    products !== null
      ? products.filter((product) =>
          product.product_name.toLowerCase().includes(filterValue.toLowerCase())
        )
      : [];

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

  // const handleSend = () => {
  //   // Obtenha os detalhes dos produtos selecionados com base nos seus IDs
  //   const selectedProducts = products.filter((product) => isSelected(product._id));

  //   // Navegue para a página de destino e passe os dados dos produtos como estado
  //   navigate('/solicita', { selectedProducts });
  // };

  const handleSend = async () => {
    try {
      const selectedProducts = products.filter((product) => isSelected(product._id));

      const selectedStatus = statuses.find((status) => status.status_type === 'em andamento');

      if (!selectedStatus) {
        console.error('Status "em andamento" não encontrado');
        return;
      }

      const requestData = {
        request_date: new Date(),
        quantity: selectedProducts.length,
        product: selectedProducts.map((product) => product._id),
        status: selectedStatus._id
      };

      /*  await axios.post('http://localhost:3000/request', requestData);
      // A solicitação foi enviada com sucesso

      // Redirecionar para a página de destino ou fazer outra ação necessária
      navigate(`/solicita/${requestId}`); */

      const response = await axios.post('http://localhost:3000/request', requestData);
      const { request: createdRequest } = response.data; // Obtenha o objeto de resposta com o pedido criado

      // Redirecionar para a página de destino e passar o ID do pedido como parâmetro na URL
      navigate(`/solicita/${createdRequest._id}`);
    } catch (error) {
      console.error('Erro ao enviar a solicitação:', error);
    }
  };

  return (
    <div>
      {products === null ? (
        <p>Carregando produtos...</p>
      ) : (
        <>
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
                      <img
                        src={product.image}
                        style={{ width: '50px', height: '50px' }}
                        alt="Imagem do produto"
                      />
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
            <p>
              {selected.length} {selected.length === 1 ? 'item selecionado' : 'itens selecionados'}
            </p>
          </div>
          <div>
            <button onClick={() => handleSend(products._id)}>Enviar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductTable;
