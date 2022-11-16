import React, { useState } from "react";
import { Control, FieldValues, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';

import { Keyboard, Alert, Modal, TouchableWithoutFeedback } from "react-native";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
  UserWrapper,
  AlertButton,
  Icon,
} from "./styles";

import { Button } from "../../components/Form/Button";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import { CategorySelect } from "../CategorySelect";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";
import { SpendingAlert } from "../SpendingAlert/SpendingAlert";

interface FormData {
  name: string;
  amount: string;
}

interface NavigationProps {
  navigate(destination: string): void;
}

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  amount: yup
    .number()
    .typeError("Informe um valor numérico")
    .positive("O valor nao pode ser negativo")
    .required("O valor é obrigatório"),
});

export function Register({navigation}: {navigation: NavigationProps}) {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [spendingAlertOpen, setSpendingAlertOpen] = useState(false);


  const {user} =  useAuth();


  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  function handleTransactionsTypeSelect(type: "positive" | "negative") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenSpendingAlert(){
    setSpendingAlertOpen(true);
  }

  function handleCloseSpendingAlert(){
    setSpendingAlertOpen(false);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) return Alert.alert("Selecione o tipo da transação");

    if (category.key === "category")
      return Alert.alert("Selecione a categoria");

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name, 
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    };

    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`;

      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria'
      });
     
      navigation.navigate("Listagem");
      console.log(data)
    
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }

  }

  const formControl = control as unknown as Control<FieldValues, any>;

  // useEffect(() => {
  //   async function loadData() {
  //     const data = await AsyncStorage.getItem(dataKey);
  //     console.log(JSON.parse(data!));
  //   }
  //   loadData();
  //   // async function removeAll(){
  //   //   await AsyncStorage.removeItem(dataKey);
  //   // }

  //   // removeAll();
  // }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <UserWrapper>
          <Title>Cadastro</Title>

            <AlertButton onPress={handleOpenSpendingAlert}>
                <Icon name="bell"/>
            </AlertButton>
            </UserWrapper>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={formControl}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={formControl}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                title="Entrada"
                type="up"
                onPress={() => handleTransactionsTypeSelect("positive")}
                isActive={transactionType == "positive"}
              />
              <TransactionTypeButton
                title="Saída"
                type="down"
                onPress={() => handleTransactionsTypeSelect("negative")}
                isActive={transactionType == "negative"}
              />
            </TransactionsTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>

        <Modal visible={spendingAlertOpen}>
          <SpendingAlert 
            closeSelectCategory={handleCloseSpendingAlert}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
