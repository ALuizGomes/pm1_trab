import { View, TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native'

interface ListCardProps extends TouchableOpacityProps {
  item: object;
}

export function ListCard({ item, ...rest }: ListCardProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonCard}
        {...rest}>
        {Object.values(item).map((data, index) => (
          <Text style={styles.textCard} key={index}>
            {index > 0 && data}
          </Text>
        ))}
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  buttonCard: {
    width: '100%',
    // padding: 6,
    backgroundColor: '#F7FAA0',
    borderRadius: 10
  },
  textCard: {
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    // flexDirection: 'row',
  }
})




