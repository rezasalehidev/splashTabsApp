import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  Image,
} from 'react-native';
import {images, theme} from '../constants';

const {onboarding1, onboarding2, onboarding3} = images;
const {FONTS, SIZES, COLORS} = theme;

const onBoardings = [
  {
    title: "Let's Travelling",
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
    img: onboarding1,
  },
  {
    title: 'Navigation',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
    img: onboarding2,
  },
  {
    title: 'Destination',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
    img: onboarding3,
  },
];

const Main = () => {
  const scrollX = new Animated.Value(0);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {onBoardings.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: SIZES.width,
              }}>
              <Image
                source={item.img}
                resizeMode="cover"
                style={{width: '100%', height: '100%'}}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 80,
                  left: 40,
                  right: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, marginTop: 10}}>{item.title}</Text>
                <Text style={{fontSize: 15, marginTop: 10}}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Main;
