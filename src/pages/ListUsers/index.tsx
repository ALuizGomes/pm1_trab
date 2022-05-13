import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, FlatList, Alert } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'
import { Header } from "../../components/Header";
import { ListCard } from '../../components/ListCard';

interface ListUsersProps {
  id: string;
  name: string;
  cpf: string;
  email: string;
  cidade: string;
}

export function ListUsers() {
  const [users, setUsers] = useState<ListUsersProps[]>([])
  const [status, setStatus] = useState('')

  function handleDeleteUser(id: string) {
    Alert.alert("Exclusão", 'Deseja Deletar Este Usuário?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes', onPress: () => {
          setStatus('E')
          setUsers(users => users.filter(user => user.id !== id))
        },
      }
    ])
  }

  async function loadDataUser() {
    const data = await AsyncStorage.getItem('@si:users')
    if (data) {
      setUsers(JSON.parse(data))
    }
  }

  useEffect(() => {
    loadDataUser()
  }, [])

  useFocusEffect(useCallback(() => {
    loadDataUser()
  }, []))

  useEffect(() => {
    async function saveUsers() {
      await AsyncStorage.setItem('@si:users', JSON.stringify(users))
    }
    saveUsers()
  }, [users])

  return (
    <View style={styles.container}>
      <Header title='Lista de Usuários' />
      <FlatList data={users} keyExtractor={item => item.id} renderItem={({ item }) => (
          <ListCard item={item} onPress={() => handleDeleteUser(item.id)} />
        )} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f2f5'
  }
})

