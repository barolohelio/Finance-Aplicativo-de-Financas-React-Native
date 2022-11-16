import React, { useContext } from 'react';
import { Button } from '../../components/Form/Button';
import {useTheme} from 'styled-components'

import { 
  Container,
  Header,
  Title,
  Form,
  Footer
} from './styles';
import { Input } from '../../components/Form/Input';

interface Props {
  closeSelectCategory: () => void;
}

export function SpendingAlert({ 
  closeSelectCategory,
}: Props) {

  const theme = useTheme();

  return (
    <Container>
      <Header>
        <Title>Defina um limite de saída</Title>
      </Header>
      <Form>

        <Input
           placeholder="Definir alerta"
           placeholderTextColor={theme.colors.text}
           keyboardType="numeric"
        />

        <Footer>
          <Button
            title='Criar Alerta'
            onPress={closeSelectCategory}
          />
        </Footer>
      </Form>
    </Container>
  );
}