import { Pressable, PressableProps, Text } from "react-native";

type Props = PressableProps & {
    data: {
        name: string,
        quantity: number
    }
}

export function Product({ data, ...rest }: Props) {
    return (
        <Pressable {...rest} style={{ backgroundColor: '#CECECE', padding: 15, borderRadius: 5, marginVertical: 2, flexDirection: 'row' }}>
            <Text>
                {data.quantity} - {data.name}
            </Text>
        </Pressable>
    );
}