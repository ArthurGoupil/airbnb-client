import React, { useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';

export default function RenderImage({
  source,
  height,
  width,
  backgroundColor,
  loaderColor,
  loaderSize,
  flex,
  imgStyle,
  containerMgnTop,
  containerMgnBottom,
  containerMgnLeft,
  containerMgnRight
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View
      style={{
        flex: flex ? flex : 1,
        height,
        marginTop: containerMgnTop ? containerMgnTop : 0,
        marginBottom: containerMgnBottom ? containerMgnBottom : 0,
        marginLeft: containerMgnLeft ? containerMgnLeft : 0,
        marginRight: containerMgnRight ? containerMgnRight : 0
      }}
    >
      {isLoading && (
        <View
          style={{
            backgroundColor: backgroundColor ? backgroundColor : '#e0e1e2',
            height: height,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ActivityIndicator
            size={loaderSize ? loaderSize : 'large'}
            color={loaderColor ? loaderColor : '#BBBBBB'}
          />
        </View>
      )}
      <Image
        source={source}
        style={imgStyle}
        onLoad={() => {
          setIsLoading(false);
        }}
      />
    </View>
  );
}
