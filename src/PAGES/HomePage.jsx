import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { abi } from '../abi';
import Web3 from 'web3';
import gif from '../ASSETS/loader.gif';

const HomePage = ({ contract, setUser }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const handleLogin = async () => {
    setLoader(true);
    if (typeof window.ethereum !== 'undefined') {
      try {
        let accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setUser(accounts[0]);
        const web3 = new Web3(window.ethereum);
        const Instance = new web3.eth.Contract(abi, contract);
        const isUser = await Instance.methods.registeredUsers(accounts[0]).call();
        if (isUser) {
          localStorage.setItem('BioHeritageHub', JSON.stringify({ address: accounts[0] }));
          navigate('/dashboard');
        } else {
          localStorage.removeItem('BioHeritageHub');
          alert('Please register first to login!!!');
        }
      } catch (error) {
        if (error.code === 4001) {
          alert('Enabling Metamask is REQUIRED');
        } else {
          alert('Check whether you have installed METAMASK or may have NETWORK issues');
        }
      } finally {
        setLoader(false);
      }
    } else {
      alert('Please Install Metamask to use this Application');
    }
  };

  const handleRegister = async () => {
    setLoader(true);
    if (typeof window.ethereum !== 'undefined') {
      try {
        let accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setUser(accounts[0]);
        const web3 = new Web3(window.ethereum);
        const Instance = new web3.eth.Contract(abi, contract);
        const isUser = await Instance.methods.registeredUsers(accounts[0]).call();
        if (isUser) {
          localStorage.setItem('BioHeritageHub', JSON.stringify({ address: accounts[0] }));
          navigate('/dashboard');
        } else {
          await Instance.methods.register().send({ from: accounts[0] });
          localStorage.setItem('BioHeritageHub', JSON.stringify({ address: accounts[0] }));
          navigate('/dashboard');
        }
      } catch (error) {
        if (error.code === 4001) {
          alert('Enabling Metamask is REQUIRED');
        } else {
          alert('Check whether you have installed METAMASK or may have NETWORK issues');
        }
      } finally {
        setLoader(false);
      }
    } else {
      alert('Please Install Metamask to use this Application');
    }
  };

  return (
    <HomeContainer>
      {loader && <Loader src={gif} alt="loading..." />}
      <Container>
        <Title>BioHeritage Activity Hub</Title>
        <Subtitle>
          A decentralized platform for community engagement and environmental conservation.
        </Subtitle>
        <Description>
          Our project aims to promote sustainable practices and support tribal communities by enabling users to participate in conservation activities and earn tokens as rewards. These tokens can be used in a marketplace to buy handmade products from tribal communities. Recieve 10 Tokens🪙 for each event you participate.
        </Description>
        <ButtonContainer>
          <StyledButton onClick={handleRegister}>Register</StyledButton>
          <StyledButton onClick={handleLogin}>Login</StyledButton>
        </ButtonContainer>
      </Container>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #e8f5e9, #c8e6c9);
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #2e7d32;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: #388e3c;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #4caf50;
  margin-bottom: 2rem;
  max-width: 30rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease-in-out;

  &
  {
  background-color: #1b5e20;
  }
  `;

  const Loader = styled.img` position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; `;

  export default HomePage;