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

export interface TransactionCardProps {
    type: "positive" | "negative";
    title: string;
    amount: string;
    category: CategoryProps;
    date: string;
}

interface Props {
  data: TransactionCardProps;
}

export function TransactionCard({data}: Props) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <AmountCard type={data.type}>
        {/* {data.type === 'negative' ? '- ' + data.amount : data.amount} */}
        {data.type === 'negative' && '- '}
        {data.amount}
      </AmountCard>

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
