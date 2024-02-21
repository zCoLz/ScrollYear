import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const App = () => {
  const [listYear] = useState(Array.from({ length: 22 }, (_, i) => ({
    label: String(new Date().getFullYear() - 20 + i),
    value: String(new Date().getFullYear() - 20 + i)
  })));

  const [currentYearIndex, setCurrentYearIndex] = useState(
    listYear.findIndex(item => item.value == String(new Date().getFullYear()))
  );

  const [currentYearIndexTemp, setCurrentYearIndexTemp] = useState(
    listYear.findIndex(item => item.value == String(new Date().getFullYear()))
  );

  const sv1 = useSharedValue(-currentYearIndex * 143);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: sv1.value }],
  }));
  const handleOnTouchStart = (e) => {
    this.firstTouch = e.nativeEvent.pageX
  }
  const updateSharedValue = () => {
    sv1.value = withTiming(-currentYearIndex * 143, { duration: 500 });
  };
  useEffect(() => {
    updateSharedValue();
    setTimeout(() => {
      setCurrentYearIndexTemp(currentYearIndex)
    }, 400);
  }, [currentYearIndex]);

  const handleOnTouchEnd = (e) => {
    const positionX = e.nativeEvent.pageX;
    const range = 50
    if (positionX - this.firstTouch > range && currentYearIndex > 0) {
      setCurrentYearIndex((prevIndex) => prevIndex - 1);
    } else if (this.firstTouch - positionX > range && currentYearIndex < listYear.length - 1) {
      setCurrentYearIndex((prevIndex) => prevIndex + 1);
    }
  };
  return (
    <View>
      <View
        onTouchStart={(e) => handleOnTouchStart(e)}
        onTouchEnd={(e) => { handleOnTouchEnd(e) }}
        style={{ backgroundColor: '#222627', width: '100%', height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
        <Animated.View
          style={[animatedStyles, { width: 130, gap: 33, height: 35, borderRadius: 2, flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start" }]}>
          {listYear.map((item, index) => {
            const isCurrentYear = index == currentYearIndexTemp;
            return (
              <View key={index}
                style={{ width: 110 }}>
                <View
                  style={{
                    backgroundColor: isCurrentYear ? '#39383d' : '#222627',
                    width: 130,
                    height: isCurrentYear ? 40 : 35,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8
                  }}>
                  <Text style={{ width: '100%', textAlign: 'center', color: isCurrentYear ? '#F1F1F1' : '#8d8f90', fontSize: isCurrentYear ? 22 : 17, fontWeight: isCurrentYear ? '700' : '400' }}>
                    {item.value}
                  </Text>
                </View>
              </View>
            );
          })}
        </Animated.View>
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80%' }}>
        <Text style={{ color: 'red', fontSize: 20 }}>{listYear[currentYearIndex].value}</Text>
      </View>
    </View>
  );
}

export default App;