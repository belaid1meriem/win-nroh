import { View, Pressable, Image, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback  } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/theme-provider';
import { THEME } from '@/lib/theme';
import { useSignInForm, Controller } from '@/hooks/forms/use-sign-in-form';

export default function SignIn() {
  const { t } = useTranslation('auth');
  const { isDark } = useTheme();
  const colors = isDark ? THEME.dark : THEME.light;
  const [showPassword, setShowPassword] = useState(false);

  const { control, errors, onSubmit, loading, error } = useSignInForm();

  return (
    <KeyboardAvoidingView 
    className='flex-1'
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={100}
    >
    <TouchableWithoutFeedback  className="flex-1"  onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-background px-6 pt-12">

        <Image
          source={require('@/assets/images/logo.png')}
          className="w-36 h-36 mx-auto mb-4"
        />

        <View className="items-center gap-1 mb-12">
          <Text className="text-foreground text-2xl font-tajawal-bold">{t('signin.ui.title')}</Text>
        </View>

        <View className="gap-1 mb-8">
          <Label className='mb-3'><Text className="text-start font-tajawal-medium">{t('signin.ui.email_label')}</Text></Label>
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
            <Text className="text-destructive text-xs font-tajawal text-start">{errors.email.message}</Text>
          )}
        </View>

        <View className="gap-1 mb-2">
          <Label className='mb-3'><Text className="font-tajawal-medium text-start">{t('signin.ui.password_label')}</Text></Label>
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
            <Pressable onPress={() => setShowPassword((v) => !v)} className="absolute end-4">
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color={colors.mutedForeground} />
            </Pressable>
          </View>
          {errors.password && (
            <Text className="text-destructive text-xs font-tajawal text-start">{errors.password.message}</Text>
          )}
        </View>

        <Pressable onPress={() => router.push('/forgot-password')} className=" mb-6">
          <Text className="text-primary text-sm font-tajawal text-start">{t('signin.ui.forgot_password')}</Text>
        </Pressable>

        {error && (
          <Text className="text-destructive text-sm text-center mb-3 font-tajawal">{error}</Text>
        )}

        <Button onPress={onSubmit} disabled={loading} className='mt-4 h-14 rounded-lg '>
          <Text className="text-primary-foreground font-tajawal-bold text-center ">
            {loading ? '...' : t('signin.ui.sign_in_button')}
          </Text>
        </Button>

        <Pressable onPress={() => router.push('/sign-up')} className="mt-8 items-center">
          <Text className="text-muted-foreground text-sm font-tajawal">
            {t('signin.ui.no_account')}{' '}
            <Text className="text-primary font-tajawal-bold">{t('signin.ui.create_account')}</Text>
          </Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}