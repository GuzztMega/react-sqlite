import { useSQLiteContext } from "expo-sqlite";

export type ProductDabase = {
  id: number;
  name: string;
  quantity: number;
};

export function useProductDatabase() {
  const database = useSQLiteContext();

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

  return { create, searchByName };
}
