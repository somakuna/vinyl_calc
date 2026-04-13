import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionButton from '../components/ActionButton';
import InputField from '../components/InputField';
import PickerField from '../components/PickerField';
import { ResultCard, ResultDivider, ResultHighlight, ResultRow } from '../components/ResultCard';
import ScreenWrapper from '../components/ScreenWrapper';
import { colors, spacing, typography } from '../theme/colors';
import { calculatePricing, calculateRoll } from '../utils/calculations';

const unitOptions = [
  { label: 'mm', value: '1000' },
  { label: 'cm', value: '100' },
  { label: 'm', value: '1' },
];

const orientationOptions = [
  { label: 'Vertikalno', value: 'vertical' },
  { label: 'Horizontalno', value: 'horizontal' },
];

export default function RollCalculatorScreen() {
  const [naziv, setNaziv] = useState('');
  const [indeks, setIndeks] = useState('100');
  const [nabavna, setNabavna] = useState('');
  const [izlazna, setIzlazna] = useState('');
  const [rollWidth, setRollWidth] = useState('');
  const [cutOrientation, setCutOrientation] = useState('vertical');
  const [tekst, setTekst] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const rollResult = calculateRoll(tekst, rollWidth, cutOrientation, indeks);
    if (rollResult.error) {
      setResult({ error: rollResult.error });
      return;
    }

    const pricing = calculatePricing(rollResult.totalMeters, nabavna, izlazna);
    setResult({
      naziv,
      ...rollResult,
      ...pricing,
      cutOrientation,
    });
  };

  return (
    <ScreenWrapper>
      <Text style={styles.screenTitle}>Izračun role</Text>

      <View style={styles.row}>
        <View style={styles.col3}>
          <InputField label="Naziv" value={naziv} onChangeText={setNaziv} placeholder="Klijent" />
        </View>
        <View style={styles.col1}>
          <PickerField label="Mjera" options={unitOptions} selectedValue={indeks} onValueChange={setIndeks} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.col1}>
          <InputField label="Nabavna cijena" value={nabavna} onChangeText={setNabavna} placeholder="€" keyboardType="decimal-pad" labelColor={colors.danger} />
        </View>
        <View style={styles.col1}>
          <InputField label="Naplatna cijena" value={izlazna} onChangeText={setIzlazna} placeholder="€" keyboardType="decimal-pad" labelColor={colors.success} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.col1}>
          <InputField label="Širina role" value={rollWidth} onChangeText={setRollWidth} placeholder="Širina" keyboardType="decimal-pad" />
        </View>
        <View style={styles.col1}>
          <PickerField label="Orijentacija" options={orientationOptions} selectedValue={cutOrientation} onValueChange={setCutOrientation} />
        </View>
      </View>

      <InputField
        label="Dimenzije"
        value={tekst}
        onChangeText={setTekst}
        placeholder={'Širina x Visina ili\nŠirina x Visina@Količina\n\nPrimjer:\n500x200\n300x150@3'}
        multiline
        numberOfLines={6}
      />

      <ActionButton title="Izračunaj" onPress={calculate} />

      {result && result.error && (
        <ResultCard title="Greška">
          <Text style={styles.errorText}>{result.error}</Text>
        </ResultCard>
      )}

      {result && !result.error && (
        <ResultCard title={result.naziv || 'Rezultat'}>
          <ResultHighlight
            label="Ukupno dužnih metara"
            value={`${result.totalMeters} m`}
          />

          <ResultRow
            label="Orijentacija"
            value={result.cutOrientation === 'vertical' ? 'Vertikalno' : 'Horizontalno'}
          />
          <ResultDivider />

          {result.details.map((d, i) => (
            <ResultRow
              key={i}
              label={`${d.wallWidth} × ${d.wallHeight}${d.quantity > 1 ? ` @${d.quantity}` : ''}`}
              value={`${d.stripsNeeded} tileova`}
              valueColor={colors.info}
            />
          ))}

          {(nabavna || izlazna) ? (
            <>
              <ResultDivider />
              <ResultRow label="Nabavna cijena" value={`${result.sumNabavna} €`} valueColor={colors.danger} />
              <ResultRow label="Izlazna cijena" value={`${result.sumIzlazna} €`} valueColor={colors.info} />
              <ResultDivider />
              <ResultHighlight label="Zarada" value={`${result.zarada} €`} valueColor={colors.success} />
            </>
          ) : null}
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
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  col1: {
    flex: 1,
  },
  col3: {
    flex: 2,
  },
  errorText: {
    ...typography.body,
    color: colors.danger,
  },
});
