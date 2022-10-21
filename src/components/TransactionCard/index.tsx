import React from "react";
import {
  Container,
  Title,
  AmountCard,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

interface CategoryProps {
  name: string;
  icon: string;
}

interface Props {
  data: {title: string;
  amount: string;
  category: CategoryProps;
  date: string;
  }
}

export function TransactionCard({data}: Props) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <AmountCard>{data.amount}</AmountCard>

      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
