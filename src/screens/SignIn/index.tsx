import React, {useContext, useState}from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import {Alert, ActivityIndicator, Platform} from 'react-native'
import {useTheme} from 'styled-components'

import AppleSvg from '../../assets/AppleSvg.svg'
import GoogleSvg from '../../assets/GoogleSvg.svg'
import LogoSvg from '../../assets/LogoSvg.svg'

import { 
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from './styles';

import {SignInSocialButton} from '../../components/SignInSocialButton'

import {useAuth} from '../../hooks/auth'

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const {signInWithGoogle, signWithApple} = useAuth();

  const theme = useTheme();
  
  async function handleSignInWithGoogle(){
    try  {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (err) {
      console.log(err)
      Alert.alert('Nao foi possível conectar conta Google')
      setIsLoading(false);
    } 
  }; 

  async function handleSignInWithApple(){
    try  {
      setIsLoading(true);
      return await signWithApple();
    } catch (err) {
      console.log(err)
      Alert.alert('Nao foi possível conectar conta Apple')
      setIsLoading(false);
    } 
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {"\n"} finanças de forma{"\n"} muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com {"\n"}uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton 
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />

        {
        Platform.OS === 'ios' &&
        <SignInSocialButton 
            title="Entrar com Apple"
            svg={AppleSvg}
            onPress={handleSignInWithApple}
          />}
        </FooterWrapper>
      {
        isLoading && 
          <ActivityIndicator 
            color={theme.colors.shape} 
            style={{marginTop: 18}}
          />
      }
      </Footer>
    </Container>
  );
}
