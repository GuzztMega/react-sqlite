import { useSQLiteContext } from "expo-sqlite";

export type ProductDabase = {
  id: number;
  name: string;
  quantity: number;
};

export function useProductDatabase() {
  const database = useSQLiteContext();

  async function show(id: number){
    try {
      const query = 'SELECT * FROM product WHERE id = ?';

      const response = await database.getFirstAsync<ProductDabase>(query, [
        id, // posso passar mais parâmetros para busca
      ]);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function searchByName(name: string) {
    try {
      const query = "SELECT * FROM product WHERE name LIKE ?";

      const response = await database.getAllAsync<ProductDabase>(
        query,
        `%${name}%`
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function create(data: Omit<ProductDabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO product(name, quantity) VALUES($name, $quantity);"
    );

    try {
      const result = await statement.executeAsync({
        $name: data.name,
        $quantity: data.quantity,
      });

      const id = result.lastInsertRowId;

      return { id };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function update(data: ProductDabase) {
    const statement = await database.prepareAsync(
      "UPDATE product SET name = $name , quantity = $quantity WHERE id = $id"
    );
    try {

      await statement.executeAsync({
        $id: data.id,
        $name: data.name,
        $quantity: data.quantity,
      });

    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }  

  async function remove(id: number) {
    try{
      await database.execAsync(`DELETE FROM product WHERE id=${id}`);
    } catch (error) {
      throw error;
    } 
  }

  return { show, searchByName, create, update, remove };
}
