import AsyncStorage from '@react-native-async-storage/async-storage'

import { useState, useEffect } from 'react'
import { View, StyleSheet, Alert, ScrollView } from 'react-native'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'

export function Dashboard() {
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [banco_agencia, setBancoAgencia] = useState('')
  const [conta, setConta] = useState('')
  const [salario, setSalario] = useState('')

  async function handleAddUser() {
    const user = {
      id: new Date().getTime(),
      name,
      cpf,
      banco_agencia,
      conta,
      salario
    }
    try {
      const data = await AsyncStorage.getItem('@si:users')
      const currentData = data ? JSON.parse(data) : []
      const dataFormatted = [...currentData, user]
      await AsyncStorage.setItem('@si:users', JSON.stringify(dataFormatted))
    } catch (err) {
      console.log(err)
      Alert.alert('Error ao salvar o usuário')
    }
    setName('')
    setCpf('')
    setBancoAgencia('')
    setConta('')
    setSalario('')
  }

  async function loadDataUser() {
    const data = await AsyncStorage.getItem('@si:users')
    const currentData = data ? JSON.parse(data) : []
    console.log(currentData)
  }

  useEffect(() => {
    loadDataUser()
  }, [])


  return (
    <View style={styles.container}>
      <Header title='Cadastro' />
      <ScrollView>
          <Input placeholder='Nome' value={name} onChangeText={value => setName(value)} />

          <Input placeholder='CPF' value={cpf} onChangeText={value => setCpf(value)} />

          <Input placeholder='Banco/Angencia' value={banco_agencia} onChangeText={value => setBancoAgencia(value)} />

          <Input placeholder='Conta' value={conta} onChangeText={value => setConta(value)} />

          <Input placeholder='Salario' value={salario} onChangeText={value => setSalario(value)} />

          <Button title='Incluir' onPress={handleAddUser} />
      </ScrollView>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f2f5'
  }
})