import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { borderRadius, colors, shadows, spacing, typography } from '../theme/colors';

export default function ActionButton({
  title,
  onPress,
  variant = 'primary',
  style,
}) {
  const variantStyles = {
    primary: {
      button: { backgroundColor: colors.primary },
      text: { color: colors.white },
    },
    success: {
      button: { backgroundColor: colors.success },
      text: { color: colors.black },
    },
    outline: {
      button: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
      },
      text: { color: colors.primary },
    },
    ghost: {
      button: { backgroundColor: colors.surfaceHighlight },
      text: { color: colors.text },
    },
  };

  const v = variantStyles[variant] || variantStyles.primary;

  return (
    <TouchableOpacity
      style={[styles.button, v.button, shadows.medium, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, v.text]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md - 2,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...typography.subtitle,
    letterSpacing: 0.5,
  },
});
