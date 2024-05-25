import React, { useState } from 'react';
import styled from 'styled-components';
import Web3 from 'web3';
import { abi } from '../abi';
import { useNavigate } from 'react-router-dom';
import Menu from '../COMPONENTS/Menu';

const SellPage = ({ contract, user }) => {
  const [productName, setProductName] = useState('');
  const [priceInTokens, setPriceInTokens] = useState('');
  const navigate = useNavigate();

  const handleSell = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const web3 = new Web3(window.ethereum);
      const instance = new web3.eth.Contract(abi, contract);
      await instance.methods.listProduct(productName, priceInTokens).send({ from: user });
      navigate('/market');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SellContainer>
      <h2>Sell Product</h2>
      <MenuContainer>
        <Menu contract={contract} user = {user} />
      </MenuContainer>
      <SellForm onSubmit={handleSell}> {/* Use onSubmit event to handle form submission */}
        <InputLabel htmlFor="productName">Product Name:</InputLabel>
        <Input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <InputLabel htmlFor="priceInTokens">Price in Tokens:</InputLabel>
        <Input
          type="number"
          id="priceInTokens"
          value={priceInTokens}
          onChange={(e) => setPriceInTokens(e.target.value)}
        />
        <SellButton type="submit">Sell</SellButton> {/* Specify type="submit" for the button */}
      </SellForm>
    </SellContainer>
  );
};

const MenuContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
`;

const SellContainer = styled.div`
  padding: 20px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SellForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 300px;
`;

const InputLabel = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const SellButton = styled.button`
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  &:hover {
    background-color: #1b5e20;
  }
`;

export default SellPage;
