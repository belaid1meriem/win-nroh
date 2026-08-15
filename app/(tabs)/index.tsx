import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-background items-center justify-center gap-4">
      <View className="bg-card border border-border rounded-lg p-6">
        <Text className="text-foreground text-xl font-bold">Test Card</Text>
        <Text className="text-muted-foreground mt-2">If this looks styled, tokens work.</Text>
      </View>
      <View className="bg-primary px-6 py-3 rounded-md">
        <Text className="text-primary-foreground font-semibold">Primary Button</Text>
      </View>
    </View>
  );
}