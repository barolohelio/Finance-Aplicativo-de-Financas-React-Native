import React, { useCallback, useEffect, useState } from "react";
import { ListRenderItem, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";
import {useTheme} from 'styled-components'

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
  LoadContainer
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string
}

interface HighlightData {
  entries: HighlightProps
  expensives: HighlightProps
  total: HighlightProps
}

export function Dashboard() {  
  const theme = useTheme();

  function getLastTransactionDate(
      collection: DataListProps[],
      type: 'positive' | 'negative'
  ){
    const lastTransaction = new Date(
    Math.max.apply(Math, collection
    .filter((transaction)  => transaction.type === 'positive')
    .map((transaction)  => new Date (transaction.date).getTime())
    ));

   return `${lastTransaction.getDate()} de ${lastTransaction
    .toLocaleString('pt-BR', {month: 'long'})}`;
  }

  const [isLoading, setIsLoading] = useState(true);
  const renderItem: ListRenderItem<DataListProps> = ({item}) => <TransactionCard data={item} />;
  
  const [transactions, setTransactions] = useState<DataListProps[]>([])
  const [highlightData, setHighLightData] = useState<HighlightData>({} as HighlightData);

  async function loadTransaction(){
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal= 0;
    let expensivesTotal = 0;

    const transactionsFormatted: DataListProps[] =  transactions
      .map((item: DataListProps) => {
       
        if(item.type === 'positive'){
          entriesTotal += Number(item.amount);
        } else {
          expensivesTotal += Number(item.amount);
        }


      // Conversão para numero e depois utiliza moeda local do Brasil
      // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
      const amount = Number(item.amount)
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
      });

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        date,
        type: item.type,
        category: item.category
      }
      
    });
    
    setTransactions(transactionsFormatted)  
    
    const lastTransactionsEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionsExpensives = getLastTransactionDate(transactions, 'negative');
    const totalInterval = `01 a ${lastTransactionsExpensives}`

    // console.log(lastTransactionEntries);

    const total = entriesTotal - expensivesTotal;

    setHighLightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionsEntries}`
      },
      expensives: {
        amount: expensivesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saída dia ${lastTransactionsExpensives}`
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })
    // console.log(transactionsFormatted)
    setIsLoading(false)
  }

  useEffect(() => {
    loadTransaction();

    // const dateKey = "@gofinances:transactions";
    // AsyncStorage.removeItem(dateKey);
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransaction();
  },[]))

  return (
    <Container>
      {
      isLoading ?
      <LoadContainer>
        <ActivityIndicator 
          color={theme.colors.primary}
          size="large"
        /> 
      </LoadContainer> : 
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: "https://avatars.githubusercontent.com/u/63430740?v=4",
                  }}
                />
                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>André</UserName>
                </User>
              </UserInfo>
              
              <LogoutButton onPress={() => {}}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData.expensives.amount}
              lastTransaction={highlightData.expensives.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionsList 
              data={transactions}
              renderItem={renderItem}
              keyExtractor={(item: DataListProps) => item.id}
            />

          </Transactions>
        </>
      }
    </Container>
  );
}
