/** @format */

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors, Constants } from 'configs';
const { FONT_PREFIX } = Constants;
const FontSize = {
  H1: 30,
  H2: 24,
  H3: 20,
  H4: 16,
  Body: 14,
  Label: 12,
};

const LineHeight = {
  H1: 38,
  H2: 32,
  H3: 28,
  H4: 24,
  Body: 22,
  Label: 20,
};

export default ({
  black,
  bold,
  heavy,
  light,
  medium,
  semibold,
  thin,
  ultralight,
  color = '#000',
  size,
  style: _style,
  hilight,
  ucfirst,
  uppercase,
  lowercase,
  children,
  regular,
  type, //H1, H2, H3, H4, Body, Label
  center,
  left,
  right,
  ...props
}) => {
  let style = {};
  if (Array.isArray(_style)) {
    style = { ...StyleSheet.flatten(_style) };
  } else {
    style = { ..._style };
  }

  let fontStyle = '';
  if (style.fontWeight) {
    if (style.fontWeight === 'normal') {
      fontStyle = '';
    } else if (style.fontWeight === 'bold') {
      fontStyle = 'Bold';
    }
    style.fontWeight = null;
  }

  let _children = null;
  if (typeof children === 'string') {
    if (ucfirst) {
      _children =
        children.charAt(0).toUpperCase() + children.slice(1).toLowerCase();
    } else if (uppercase) {
      _children = children.toUpperCase();
    } else if (lowercase) {
      _children = children.toLowerCase();
    }
  }

  if (black) {
    fontStyle = 'Black';
  }
  if (bold) {
    fontStyle = 'Bold';
  }
  if (heavy) {
    fontStyle = 'Heavy';
  }
  if (light) {
    fontStyle = 'Light';
  }
  if (medium) {
    fontStyle = 'Medium';
  }
  if (semibold) {
    fontStyle = 'Semibold';
  }
  if (thin) {
    fontStyle = 'Thin';
  }
  if (ultralight) {
    fontStyle = 'Ultralight';
  }
  if (regular) {
    fontStyle = '';
  }
  let textSize = size;
  let lineHeight = size;
  if (type) {
    textSize = FontSize[`${type}`];
    lineHeight = LineHeight[`${type}`];
  }

  let textAlign = 'left';

  if (left) {
    textAlign = 'left';
  }
  if (center) {
    textAlign = 'center';
  }
  if (right) {
    textAlign = 'right';
  }

  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: FONT_PREFIX + fontStyle,
          color: hilight ? Colors.Primary : color,
          fontSize: textSize,
          lineHeight: lineHeight,
          textAlign: textAlign,
        },
        style,
      ]}
    >
      {_children || children}
    </Text>
  );
};
