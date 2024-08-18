import { Input } from '@/components/Input';
import { useState } from 'react';
import { View, Button } from 'react-native';

export default function Index() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [products, setProducts] = useState([]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 30, gap: 16 }}>
      <Input placeholder='Name' />
      <Input placeholder='Quantity' />
      <Button title='Save' />
    </View>
  )
}