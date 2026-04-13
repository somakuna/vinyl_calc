import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { borderRadius, colors, shadows, spacing, typography } from '../theme/colors';

export function ResultCard({ children, title }) {
  return (
    <View style={[styles.card, shadows.medium]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {title && <View style={styles.divider} />}
      {children}
    </View>
  );
}

export function ResultRow({ label, value, valueColor, bold }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, bold && styles.bold]}>{label}</Text>
      <Text style={[styles.rowValue, bold && styles.bold, valueColor && { color: valueColor }]}>
        {value}
      </Text>
    </View>
  );
}

export function ResultDivider() {
  return <View style={styles.divider} />;
}

export function ResultHighlight({ label, value, valueColor }) {
  return (
    <View style={styles.highlight}>
      <Text style={styles.highlightLabel}>{label}</Text>
      <Text style={[styles.highlightValue, valueColor && { color: valueColor }]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  title: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs + 2,
  },
  rowLabel: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  rowValue: {
    ...typography.body,
    color: colors.text,
    textAlign: 'right',
  },
  bold: {
    fontWeight: '700',
  },
  highlight: {
    backgroundColor: colors.surfaceHighlight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  highlightLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  highlightValue: {
    ...typography.hero,
    color: colors.primary,
  },
});
