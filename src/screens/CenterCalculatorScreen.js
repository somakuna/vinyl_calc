import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionButton from '../components/ActionButton';
import InputField from '../components/InputField';
import { ResultCard, ResultHighlight, ResultRow } from '../components/ResultCard';
import ScreenWrapper from '../components/ScreenWrapper';
import { borderRadius, colors, spacing, typography } from '../theme/colors';
import { calculateCenter } from '../utils/calculations';

function CenterVisualization({ surfaceWidth, segmentWidth, middle, segmentPercent, middlePercent }) {
  return (
    <View style={visStyles.container}>
      <Text style={visStyles.topLabel}>{surfaceWidth}</Text>
      <View style={visStyles.surface}>
        <View style={[visStyles.side, { width: `${middlePercent}%` }]}>
          <Text style={visStyles.sideLabel}>{middle}</Text>
        </View>
        <View style={[visStyles.segment, { width: `${segmentPercent}%` }]}>
          <Text style={visStyles.segmentLabel}>{segmentWidth}</Text>
        </View>
        <View style={[visStyles.side, { width: `${middlePercent}%` }]}>
          <Text style={visStyles.sideLabel}>{middle}</Text>
        </View>
      </View>
    </View>
  );
}

const visStyles = StyleSheet.create({
  container: {
    marginVertical: spacing.lg,
    alignItems: 'center',
  },
  topLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    fontStyle: 'italic',
  },
  surface: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  side: {
    backgroundColor: '#FFC93C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideLabel: {
    ...typography.small,
    color: '#000',
    fontWeight: '600',
    fontStyle: 'italic',
  },
  segment: {
    backgroundColor: colors.info,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentLabel: {
    ...typography.caption,
    color: '#FFF',
    fontWeight: '600',
    fontStyle: 'italic',
  },
});

export default function CenterCalculatorScreen() {
  const [sirinaPovrsine, setSirinaPovrsine] = useState('');
  const [sirinaSegmenta, setSirinaSegmenta] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const res = calculateCenter(sirinaPovrsine, sirinaSegmenta);
    setResult(res);
  };

  return (
    <ScreenWrapper>
      <Text style={styles.screenTitle}>Izračun sredine</Text>

      <InputField
        label="Širina površine"
        value={sirinaPovrsine}
        onChangeText={setSirinaPovrsine}
        placeholder="Unesite širinu površine"
        keyboardType="decimal-pad"
      />

      <InputField
        label="Širina segmenta"
        value={sirinaSegmenta}
        onChangeText={setSirinaSegmenta}
        placeholder="Unesite širinu segmenta"
        keyboardType="decimal-pad"
      />

      <ActionButton title="Izračunaj" onPress={calculate} />

      {result && result.error && (
        <ResultCard title="Greška">
          <Text style={styles.errorText}>{result.error}</Text>
        </ResultCard>
      )}

      {result && !result.error && (
        <ResultCard title="Rezultat">
          <CenterVisualization
            surfaceWidth={result.surfaceWidth}
            segmentWidth={result.segmentWidth}
            middle={result.middle}
            segmentPercent={result.segmentPercent}
            middlePercent={result.middlePercent}
          />

          <ResultRow label="Širina površine" value={result.surfaceWidth} />
          <ResultRow label="Širina segmenta" value={result.segmentWidth} valueColor={colors.info} />
          <ResultHighlight label="Sredina (od ruba)" value={result.middle} valueColor={colors.warning} />
        </ResultCard>
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  screenTitle: {
    ...typography.hero,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  errorText: {
    ...typography.body,
    color: colors.danger,
  },
});
