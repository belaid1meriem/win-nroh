import {
  View,
  Pressable,
  ScrollView,
  Animated,
  Easing,
  Image as RNImage,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { I18nManager } from 'react-native';
import  { Image }  from 'expo-image'

const onboardingData = [
  {
    id: 'discover',
    image: require('@/assets/images/onboarding/discover.webp'),
  },
  {
    id: 'save',
    image: require('@/assets/images/onboarding/save.webp'),
  },
  {
    id: 'plan',
    image: require('@/assets/images/onboarding/plan.webp'),
  },
];

export default function Onboarding() {
  const { t } = useTranslation('onboarding');
  const [currentIndex, setCurrentIndex] = useState(0);
  const completeOnboarding = useOnboardingStore(
    (state) => state.completeOnboarding
  );

  const current = onboardingData[currentIndex];
  const isLast = currentIndex === onboardingData.length - 1;



  const slideX = useRef(new Animated.Value(0)).current;

  // Handle slide transition
  useEffect(() => {
    const isRTL = I18nManager.isRTL;
    const direction = isRTL ? -1 : 1;

    slideX.setValue(direction * 400);

    Animated.timing(slideX, {
      toValue: 0,
      duration: 350,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  const handleNext = () => {
    if (isLast) {
      completeOnboarding();
      router.replace('/set-preferred-language');
      return;
    }
    setCurrentIndex((index) => index + 1);
  };

  const handleSkip = () => {
    completeOnboarding();
    router.replace('/set-preferred-language');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <View className="flex-1 bg-background ">
        <View className="flex-1 bg-background overflow-hidden">
          <Animated.View
            style={{
              flex: 1,
              transform: [{ translateX: slideX }],
            }}
          >
            <View className="flex-1 items-center">
              <View className="flex-1 w-full justify-center">
                <Text className="text-primary text-5xl font-tajawal-bold text-center">
                  {t(`slides.${current.id}.title_ar`)}
                </Text>
                <Text className="text-foreground text-xl font-tajawal-medium text-center mt-1">
                  {t(`slides.${current.id}.description_ar`)}
                </Text>
                <Text className="text-accent text-2xl font-tajawal-bold text-center mt-6">
                  {t(`slides.${current.id}.title_fr`)}
                </Text>
                <Text className="text-muted-foreground text-lg font-tajawal-medium text-center mt-1">
                  {t(`slides.${current.id}.description_fr`)}
                </Text>
              </View>

              <View className="flex-1 w-full max-h-[60%] relative -top-20">
                <View className="w-full aspect-square">
                  <RNImage
                    key={current.id}
                    source={current.image}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              </View>
            </View>
          </Animated.View>

          <View className="px-5 py-5">
            <View className="flex-row items-center justify-between">
              {!isLast ? (
                <Pressable
                  onPress={handleSkip}
                  className="h-10 justify-center px-1"
                >
                  <Text className="text-primary font-tajawal-medium text-base">
                    {t('actions.skip')}
                  </Text>
                </Pressable>
              ) : (
                <View className="w-14" />
              )}

              <View className="flex-row items-center gap-1.5">
                {onboardingData.map((slide, index) => (
                  <View
                    key={slide.id}
                    className={`rounded-full ${
                      index === currentIndex
                        ? 'w-2.5 h-2.5 bg-primary'
                        : 'w-2 h-2 bg-muted'
                    }`}
                  />
                ))}
              </View>

              <Button
                onPress={handleNext}
                className="h-10 rounded-lg px-4"
                variant="default"
              >
                <Text className="text-primary-foreground font-tajawal-medium text-base">
                  {t(isLast ? 'actions.start' : 'actions.next')}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}