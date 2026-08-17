import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="sign-in" 
        options={{
          // Prevent going back from sign-in
          gestureEnabled: false,
        }}
      />
      <Stack.Screen 
        name="sign-up" 
        options={{
          // Allow going back to sign-in
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}