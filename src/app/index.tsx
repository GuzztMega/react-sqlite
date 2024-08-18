import { Input } from '@/components/Input';
import { useEffect, useState } from 'react';
import { View, Button, Alert, FlatList, Text } from 'react-native';
import { useProductDatabase, ProductDabase } from '@/database/useProductDatabase';
import { Product } from '@/components/Product';

export default function Index() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<ProductDabase[]>([]);

  const productDatabase = useProductDatabase();

  async function create() {
    try {

      if (isNaN(Number(quantity))) {
        return Alert.alert('Quantity', 'Must be a positive number')
      }

      if (Number(quantity) < 1) {
        return Alert.alert("Quantity", "Must be at least 1.")
      }

      const response = await productDatabase.create({ name, quantity: Number(quantity) });
      Alert.alert('Successfully registered Product. ID: ' + response.id);

      list();

    } catch (error) {
      console.log('error creating product ', error);
    }
  }

  async function list() {
    try {
      const response = await productDatabase.searchByName(search);
      setProducts(response);
    } catch (error) {
      console.log('error listing products ', error);
    }
  }

  useEffect(() => {
    list();
  }, [search]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 30, gap: 16 }}>

      <Text style={{ fontWeight: 'bold', alignSelf: 'center', marginTop: 50 }}> NEW PRODUCT </Text>
      <Input placeholder='Name' onChangeText={setName} value={name} />
      <Input placeholder='Quantity' onChangeText={setQuantity} value={quantity.toString()} />
      <Button title='Save' onPress={create} />

      <Text style={{ fontWeight: 'bold', alignSelf: 'center', marginTop: 50 }}> PRODUCTS </Text>
      <Input placeholder='Search...' onChangeText={setSearch} />
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Product data={item} />}
      />

    </View>
  )
}