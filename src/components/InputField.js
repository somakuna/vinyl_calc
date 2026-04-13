import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { borderRadius, colors, spacing, typography } from '../theme/colors';

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  labelColor,
  multiline = false,
  numberOfLines = 1,
}) {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, labelColor && { color: labelColor }]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[styles.input, multiline && styles.multiline]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    color: colors.text,
    ...typography.body,
  },
  multiline: {
    minHeight: 120,
    paddingTop: spacing.sm + 4,
  },
});
