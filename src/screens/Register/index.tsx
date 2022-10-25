import React, { useState } from 'react';
import {Modal} from 'react-native'

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles';

import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import {CategorySelect} from '../CategorySelect'

export function Register() {
  const  [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });


  function handleTransactionsTypeSelect(type: 'up' |  'down') {
    setTransactionType(type)
  }

  console.log(categoryModalOpen)

  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input
            placeholder="Nome"
          />
          <Input
            placeholder="Preço"
          />

          <TransactionsTypes>
            <TransactionTypeButton
              title='Entrada'
              type='up'
              onPress={() => handleTransactionsTypeSelect('up')}
              isActive={transactionType == 'up'}
            />
            <TransactionTypeButton
              title='Saída'
              type='down'
              onPress={() => handleTransactionsTypeSelect('down')}
              isActive={transactionType == 'down'}
            />
          </TransactionsTypes>

          <CategorySelectButton 
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
            />
        </Fields>

        <Button title='Enviar'/>
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect 
          category= {category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>

    </Container>
  );
}