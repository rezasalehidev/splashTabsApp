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
    title: 'Pitzza Italiano',
    description: 'Pittza iS Best 1',
    img: onboarding1,
  },
  {
    title: 'Pitzza2',
    description: 'Pittza iS Best 2',
    img: onboarding2,
  },
  {
    title: 'Pitzza3',
    description: 'Pittza iS Best 3',
    img: onboarding3,
  },
];

const Main = () => {
  const scrollX = new Animated.Value(0);

  const [completed, setCompleted] = React.useState(false);

  React.useEffect(() => {
    scrollX.addListener(({value}) => {
      if (Math.floor(value / SIZES.width) === onBoardings.length - 1) {
        setCompleted(true);
      }
    });

    return () => scrollX.removeListener();
  }, []);

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
              key={index}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: SIZES.width,
              }}>
              <Image
                source={item.img}
                resizeMode="cover"
                style={{width: '100%', height: '80%', borderRadius: 20}}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 20,
                  left: 40,
                  right: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: COLORS.white,
                  padding: SIZES.padding,
                  borderRadius: SIZES.radius,
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

      {onBoardings.map((item, index) => {
        const dotPosition = Animated.divide(scrollX, SIZES.width);

        return (
          <View style={styles.dotsRootContainer} key={index}>
            <View style={styles.dotsContainer}>
              {onBoardings.map((item, index) => {
                const opacity = dotPosition.interpolate({
                  inputRange: [index - 1, index, index + 1],
                  outputRange: [0.3, 1, 0.3],
                  extrapolate: 'clamp',
                });

                const dotSize = dotPosition.interpolate({
                  inputRange: [index - 1, index, index + 1],
                  outputRange: [SIZES.base, 17, SIZES.base],
                  extrapolate: 'clamp',
                });

                return (
                  <Animated.View
                    key={index}
                    opacity={opacity}
                    style={[styles.dot, {width: dotSize, height: dotSize}]}
                  />
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dotsRootContainer: {
    position: 'absolute',
    justifyContent: 'center',
    bottom: SIZES.height > 700 ? '20%' : '-10%',
    left: '40%',
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.padding / 2,
    marginBottom: SIZES.padding * 3,
    height: SIZES.padding,
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2,
  },
});

export default Main;
