import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Control, FieldValues, useForm } from 'react-hook-form';
import schema from 'yup/lib/schema';

import { Button } from '../../components/Form/Button';
import { InputForm } from '../../components/Form/InputForm';

import { 
  Container,
  Header,
  Title,
  Footer,
} from './styles';


interface Props {
  closeSelectCategory: () => void;
}





export function SpendingAlert({ 
  closeSelectCategory,
}: Props) {


  return (
    <Container>
      <Header>
        <Title>Alerta</Title>
      </Header>
 
   

      <Footer>
        <Button 
          title='Selecionar'
          onPress={closeSelectCategory}
        />
      </Footer>
    </Container>
  );
}