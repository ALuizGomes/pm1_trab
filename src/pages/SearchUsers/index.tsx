import AsyncStorage from '@react-native-async-storage/async-storage'

import { useState, useEffect, useCallback } from 'react'

import { View, StyleSheet, FlatList, Alert} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { ListCard } from '../../components/ListCard'

interface SearchUsersProps {
  id: string;
  name: string;
  cidade: string;
  email: string;
  cpf: string;
}

export function SearchUsers() {
  const [user, setUser] = useState('')
  const [city, setCity] = useState('')
  const [users, setUsers] = useState<SearchUsersProps[]>([])
  const [filteredUsers, setFilteredUsers] = useState<SearchUsersProps[]>([])

  async function loadUsers() {
    const storagedUsers = await AsyncStorage.getItem('@si:users')
    if (storagedUsers) {
      setUsers(JSON.parse(storagedUsers))
    }
  }

  async function SearchUsers() {    
    if(user.length === 0 && city.length === 0){
      Alert.alert('Digite um Nome de Usuario ou Cidade Validos!')
      setFilteredUsers([])
      return
    }

    let data_name = users.filter(userFilter => userFilter.name.includes(user))
    let data_cidade = users.filter(cityFilter => cityFilter.cidade.includes(city))

    if (data_name.length === 0 && data_cidade.length === 0) {
      Alert.alert('Usuario ou Cidade Nao Encontrados!')
      setFilteredUsers([])
      return
    }
    if(data_name.length === 0 || data_cidade.length === 0){
      Alert.alert('Usuario ou Cidade Nao Encontrados!')
      setFilteredUsers([])
      return
    }
    if(){}
    setFilteredUsers(data_name)
  }
  
  useEffect(() => {
    loadUsers()
  }, [])

  useFocusEffect(useCallback(() => {
    loadUsers()
  }, []))


  return (
    <View style={styles.container}>
      <Header title='Pesquisa Usuários' />
      <Input placeholder='Usuário:' value={user} onChangeText={value => setUser(value)} />
      <Input placeholder='Cidade:' value={city} onChangeText={value => setCity(value)} />

      <Button title='Pesquisar' onPress={SearchUsers} />

      <FlatList showsVerticalScrollIndicator={false} data={filteredUsers} keyExtractor={item => item.id} renderItem={({item}) => (
        <ListCard item={item} />
      )}/>
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