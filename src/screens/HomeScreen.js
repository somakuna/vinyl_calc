import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { borderRadius, colors, shadows, spacing, typography } from '../theme/colors';

const { width } = Dimensions.get('window');
const CARD_GAP = 12;
const CARD_WIDTH = (width - 40 - CARD_GAP) / 2;

const calculators = [
  {
    key: 'AreaCalculator',
    title: 'Izračun m²',
    subtitle: 'Kalkulacija površine',
    icon: '⊞',
    gradient: ['#E94560', '#C73A52'],
    accentColor: '#E94560',
  },
  {
    key: 'TextCalculator',
    title: 'Iz teksta',
    subtitle: 'm² iz teksta',
    icon: '≡',
    gradient: ['#4DA8DA', '#3A8FBF'],
    accentColor: '#4DA8DA',
  },
  {
    key: 'CenterCalculator',
    title: 'Sredina',
    subtitle: 'Centriranje segmenta',
    icon: '⊕',
    gradient: ['#FFC93C', '#D4A830'],
    accentColor: '#FFC93C',
  },
  {
    key: 'RollCalculator',
    title: 'Rola',
    subtitle: 'Dužni metar role',
    icon: '◎',
    gradient: ['#00C9A7', '#00A88A'],
    accentColor: '#00C9A7',
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <ScreenWrapper scrollable={false}>
      <View style={styles.header}>
        <Text style={styles.brand}>VINYL</Text>
        <Text style={styles.brandAccent}>CALC</Text>
      </View>
      <Text style={styles.tagline}>ninaarm m² area calculator</Text>

      <View style={styles.grid}>
        {calculators.map((calc) => (
          <TouchableOpacity
            key={calc.key}
            style={[styles.card, shadows.medium]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate(calc.key)}
          >
            <View style={[styles.cardAccent, { backgroundColor: calc.accentColor }]} />
            <View style={styles.cardContent}>
              <Text style={[styles.cardIcon, { color: calc.accentColor }]}>
                {calc.icon}
              </Text>
              <Text style={styles.cardTitle}>{calc.title}</Text>
              <Text style={styles.cardSubtitle}>{calc.subtitle}</Text>
            </View>
            <View style={[styles.cardArrow, { backgroundColor: calc.accentColor + '20' }]}>
              <Text style={[styles.arrowText, { color: calc.accentColor }]}>→</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.footer}>v1.0 — React Native</Text>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: spacing.xl,
  },
  brand: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 3,
  },
  brandAccent: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 3,
  },
  tagline: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CARD_GAP,
    flex: 1,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    minHeight: CARD_WIDTH * 1.1,
    justifyContent: 'space-between',
  },
  cardAccent: {
    height: 3,
    width: '100%',
  },
  cardContent: {
    padding: spacing.lg,
    flex: 1,
    justifyContent: 'center',
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  cardTitle: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    ...typography.small,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardArrow: {
    alignSelf: 'flex-end',
    margin: spacing.md,
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 18,
    fontWeight: '700',
  },
  footer: {
    ...typography.small,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.lg,
    letterSpacing: 1,
  },
});
