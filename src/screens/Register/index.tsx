import React, { useState } from 'react';
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

export function Register() {
  const  [transactionType, setTransactionType] = useState('');

  function handleTransactionsTypeSelect(type: 'up' |  'down') {
    setTransactionType(type)
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


        </Fields>

        <Button title='Enviar'/>
      </Form>

    </Container>
  );
}