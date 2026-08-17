import { View, Pressable, Image, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/theme-provider';
import { THEME } from '@/lib/theme';
import { useSignUpForm, Controller } from '@/hooks/forms/use-sign-up-form';

export default function Signup() {
  const { t } = useTranslation('auth');
  const { isDark } = useTheme();
  const colors = isDark ? THEME.dark : THEME.light;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, errors, onSubmit, loading, error } = useSignUpForm();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
          <ScrollView 
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="px-6 pt-24 pb-8">

              <View className="items-center gap-1 mb-8">
                <Text className="text-foreground text-2xl font-tajawal-bold">
                  {t('signup.ui.title')}
                </Text>
              </View>

              <View className="gap-1 mb-6">
                <Label className="mb-3">
                  <Text className="text-start font-tajawal-medium">
                    {t('signup.ui.name_label')}
                  </Text>
                </Label>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Belaid Meriem"
                      autoCapitalize="none"
                      className="font-tajawal-medium h-12 text-start"
                    />
                  )}
                />
                {errors.name && (
                  <Text className="text-destructive text-xs font-tajawal text-start">
                    {errors.name.message}
                  </Text>
                )}
              </View>

              <View className="gap-1 mb-6">
                <Label className="mb-3">
                  <Text className="text-start font-tajawal-medium">
                    {t('signup.ui.email_label')}
                  </Text>
                </Label>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="exemple@email.com"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      className="font-tajawal-medium h-12 text-start"
                    />
                  )}
                />
                {errors.email && (
                  <Text className="text-destructive text-xs font-tajawal text-start">
                    {errors.email.message}
                  </Text>
                )}
              </View>

              <View className="gap-1 mb-2">
                <Label className="mb-3">
                  <Text className="font-tajawal-medium text-start">
                    {t('signup.ui.password_label')}
                  </Text>
                </Label>
                <View className="relative justify-center w-full">
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry={!showPassword}
                        className="h-12 font-tajawal w-full text-start"
                      />
                    )}
                  />
                  <Pressable 
                    onPress={() => setShowPassword((v) => !v)} 
                    className="absolute end-4"
                  >
                    <Ionicons 
                      name={showPassword ? 'eye-off' : 'eye'} 
                      size={20} 
                      color={colors.mutedForeground} 
                    />
                  </Pressable>
                </View>
                {errors.password && (
                  <Text className="text-destructive text-xs font-tajawal text-start">
                    {errors.password.message}
                  </Text>
                )}
              </View>

              <View className="gap-1 mb-4">
                <Label className="mb-3">
                  <Text className="font-tajawal-medium text-start">
                    {t('signup.ui.confirm_password_label')}
                  </Text>
                </Label>
                <View className="relative justify-center w-full">
                  <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry={!showConfirmPassword}
                        className="h-12 font-tajawal w-full text-start"
                      />
                    )}
                  />
                  <Pressable
                    onPress={() => setShowConfirmPassword((v) => !v)}
                    className="absolute end-4"
                  >
                    <Ionicons
                      name={showConfirmPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color={colors.mutedForeground}
                    />
                  </Pressable>
                </View>
                {errors.confirmPassword && (
                  <Text className="text-destructive text-xs font-tajawal text-start">
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View>

              <Pressable 
                onPress={() => router.push('/forgot-password')} 
                className="mb-6"
              >
                <Text className="text-primary text-sm font-tajawal text-start">
                  {t('signup.ui.forgot_password')}
                </Text>
              </Pressable>

              {error && (
                <Text className="text-destructive text-sm text-center mb-3 font-tajawal">
                  {error}
                </Text>
              )}

              <Button 
                onPress={onSubmit} 
                disabled={loading} 
                className="mt-2 h-14 rounded-lg"
              >
                <Text className="text-primary-foreground font-tajawal-bold text-center">
                  {loading ? '...' : t('signup.ui.sign_in_button')}
                </Text>
              </Button>

              <Pressable 
                onPress={() => router.push('/sign-in')} 
                className="mt-8 items-center"
              >
                <Text className="text-muted-foreground text-sm font-tajawal">
                  {t('signup.ui.no_account')}{' '}
                  <Text className="text-primary font-tajawal-bold">
                    {t('signup.ui.create_account')}
                  </Text>
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}