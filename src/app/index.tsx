import { Input } from '@/components/Input';
import { useProductDatabase } from '@/database/useProductDatabase';
import { useState } from 'react';
import { View, Button, Alert } from 'react-native';

export default function Index() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [products, setProducts] = useState([]);

  const productDatabase = useProductDatabase();

  async function create() {
    try {

      if(isNaN(Number(quantity))){
        return Alert.alert('Quantity', 'Must be a positive number')
      }
        
      if(Number(quantity) < 1){
        return Alert.alert("Quantity", "Must be at least 1.")
      }

      const response = await productDatabase.create({ name, quantity: Number(quantity) });
      return Alert.alert('Successfully registered Product. ID: ' + response.id);

    } catch (error) {
      console.log('error creating product', error);  
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 30, gap: 16 }}>
      <Input placeholder='Name' onChangeText={setName} value={name} />
      <Input placeholder='Quantity' onChangeText={setQuantity} value={quantity.toString()} />

      <Button title='Save' onPress={create}/>
    </View>
  )
}