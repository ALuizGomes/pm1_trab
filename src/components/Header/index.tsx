import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

interface IHeaderProps {
  title: string;
}

export function Header({ title }: IHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}
export const styles = StyleSheet.create({
  container: {
    // width: '100%',
    height: 100,
    backgroundColor: '#4DDB40',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  }
})