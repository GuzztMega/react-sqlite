import { useEffect, useState } from 'react';
import { View, Button, Alert, FlatList, Text } from 'react-native';
import { router } from 'expo-router';

import { Input } from '@/components/Input';
import { Product } from '@/components/Product';
import { useProductDatabase, ProductDabase } from '@/database/useProductDatabase';

export default function Index() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<ProductDabase[]>([]);

  const productDatabase = useProductDatabase();

  async function list() {
    try {
      const response = await productDatabase.searchByName(search);
      setProducts(response);
    } catch (error) {
      console.log('error listing products ', error);
    }
  }

  async function create() {
    try {

      if (isNaN(Number(quantity))) {
        return Alert.alert('Quantity', 'Must be a positive number')
      }

      if (Number(quantity) < 1) {
        return Alert.alert("Quantity", "Must be at least 1.")
      }

      const response = await productDatabase.create({ name, quantity: Number(quantity) });
      Alert.alert(`Successfully registered Product "${name}"`);

    } catch (error) {
      console.log('error creating product ', error);
    }
  }

  async function update() {
    try {

      if (isNaN(Number(quantity))) {
        return Alert.alert('Quantity', 'Must be a positive number')
      }

      if (Number(quantity) < 1) {
        return Alert.alert("Quantity", "Must be at least 1.")
      }

      const response = await productDatabase.update({
        id: Number(id),
        name,
        quantity: Number(quantity)
      });

      Alert.alert(`Successfully updated "${name}"`);

    } catch (error) {
      console.log('error creating product ', error);
    }
  }

  async function remove(id: number) {
    try {
      await productDatabase.remove(id);
      await list();
    } catch (error) {
      console.log(error)
    }
  }

  async function showDetails(item: ProductDabase) {
    setId(String(item.id))
    setName(item.name)
    setQuantity(String(item.quantity))
  }

  async function handleSave() {
    if (id) {
      update();
    } else {
      create();
    }

    setId('')
    setName('')
    setQuantity('')
    await list();
  }

  useEffect(() => {
    list();
  }, [search]);

  return (
    <View style={{ justifyContent: 'center', padding: 30, gap: 16, marginTop: 45 }}>

      <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}> NEW PRODUCT </Text>
      <Input placeholder='Name' onChangeText={setName} value={name} />
      <Input placeholder='Quantity' onChangeText={setQuantity} value={quantity.toString()} />
      <Button title='Save' onPress={handleSave} />

      <Text style={{ fontWeight: 'bold', alignSelf: 'center', marginTop: 50 }}> PRODUCTS </Text>
      <Input placeholder='Search...' onChangeText={setSearch} />
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Product
            data={item}
            onPress={() => showDetails(item)}
            onDelete={() => remove(item.id)}
            // @ts-ignore
            onShow={() => router.navigate(`/details/${item.id}`)}
          />
        )}
      />

    </View>
  )
}