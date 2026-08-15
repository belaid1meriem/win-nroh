import { View, Text, Pressable } from 'react-native';
import { useSession } from '@/providers/session-provider';

export default function SignIn() {
  const { signIn } = useSession();
  return (
    <View className="flex-1 bg-background items-center justify-center gap-4">
      <Text className="text-foreground text-xl font-bold">Sign In (placeholder)</Text>
      <Pressable onPress={signIn} className="bg-primary px-6 py-3 rounded-md">
        <Text className="text-primary-foreground font-semibold">Sign In</Text>
      </Pressable>
    </View>
  );
}