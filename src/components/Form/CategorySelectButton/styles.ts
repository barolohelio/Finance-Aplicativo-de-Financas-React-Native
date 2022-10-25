import styled from "styled-components/native";
import {RectButton} from 'react-native-gesture-handler'

import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton).attrs({
  activeOpacity: 0.7
})`
  flex-direction: row;
  margin-top: 16px;

  background-color: ${({theme}) => theme.colors.shape};

  align-items: center;
  justify-content: space-between;
  border-radius: 5px;

  padding: 20px;
`;

export const Category = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({theme}) => theme.colors.text};

`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;

  color: ${({ theme }) => theme.colors.text};
`;
