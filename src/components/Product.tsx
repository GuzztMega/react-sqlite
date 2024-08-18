import { Pressable, PressableProps, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = PressableProps & {
    data: {
        name: string,
        quantity: number
    }

    onDelete: () => void
    onShow: () => void
}

export function Product({ data, onDelete, onShow, ...rest }: Props) {
    return (
        <Pressable {...rest} style={{ backgroundColor: '#e0e0e0', padding: 15, borderRadius: 5, marginVertical: 2, flexDirection: 'row' }}>
            <Text style={{ flex: 1 }}>
                {data.quantity}x  |  {data.name}
            </Text>

            <TouchableOpacity onPress={onShow}>
                <MaterialIcons name='search' size={24} color='blue'/>
            </TouchableOpacity>

            <TouchableOpacity onPress={onDelete}>
                <MaterialIcons name='delete' size={24} color='#ff4545'/>
            </TouchableOpacity>
        </Pressable>
    );
}