import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionButton from '../components/ActionButton';
import InputField from '../components/InputField';
import PickerField from '../components/PickerField';
import { ResultCard, ResultDivider, ResultHighlight, ResultRow } from '../components/ResultCard';
import ScreenWrapper from '../components/ScreenWrapper';
import { colors, spacing, typography } from '../theme/colors';
import { calculateAreaFromText, calculatePricing } from '../utils/calculations';

const unitOptions = [
  { label: 'mm', value: '1000' },
  { label: 'cm', value: '100' },
  { label: 'm', value: '1' },
];

export default function TextCalculatorScreen() {
  const [naziv, setNaziv] = useState('');
  const [indeks, setIndeks] = useState('1000');
  const [nabavna, setNabavna] = useState('');
  const [izlazna, setIzlazna] = useState('');
  const [tekst, setTekst] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const { results, totalM2 } = calculateAreaFromText(tekst, indeks);
    if (results.length === 0) {
      setResult({ error: 'Nema pronađenih dimenzija u tekstu!' });
      return;
    }

    const pricing = calculatePricing(totalM2, nabavna, izlazna);
    setResult({
      naziv,
      results: results.map((r) => ({
        ...r,
        price: Math.round(r.m2 * (parseFloat(izlazna) || 0) * 100) / 100,
      })),
      totalM2,
      ...pricing,
    });
  };

  return (
    <ScreenWrapper>
      <Text style={styles.screenTitle}>Izračun m² iz teksta</Text>

      <InputField label="Naziv" value={naziv} onChangeText={setNaziv} placeholder="Naziv klijenta" />
      <PickerField label="Jedinica mjere" options={unitOptions} selectedValue={indeks} onValueChange={setIndeks} />

      <View style={styles.priceRow}>
        <View style={styles.priceCol}>
          <InputField label="Nabavna cijena" value={nabavna} onChangeText={setNabavna} placeholder="€" keyboardType="decimal-pad" labelColor={colors.danger} />
        </View>
        <View style={styles.priceCol}>
          <InputField label="Naplatna cijena" value={izlazna} onChangeText={setIzlazna} placeholder="€" keyboardType="decimal-pad" labelColor={colors.success} />
        </View>
      </View>

      <InputField
        label="Dimenzije (tekst)"
        value={tekst}
        onChangeText={setTekst}
        placeholder={'Unesite dimenzije, npr:\n500x200\n300X150\n400*100'}
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
          {(nabavna || izlazna) ? (
            <>
              <ResultRow label="Nabavna cijena/m²" value={`${nabavna || 0} €`} valueColor={colors.danger} />
              <ResultRow label="Naplatna cijena/m²" value={`${izlazna || 0} €`} valueColor={colors.info} />
              <ResultDivider />
            </>
          ) : null}

          {result.results.map((r, i) => (
            <ResultRow
              key={i}
              label={`${r.width} × ${r.height}`}
              value={`${r.m2} m² = ${r.price} €`}
              valueColor={colors.primary}
            />
          ))}

          <ResultDivider />
          <ResultHighlight label="Ukupno m²" value={`${result.totalM2} m²`} />

          {(nabavna || izlazna) ? (
            <>
              <ResultRow label="Ukupno nabavna" value={`${result.sumNabavna} €`} valueColor={colors.danger} />
              <ResultRow label="Ukupno izlazna" value={`${result.sumIzlazna} €`} valueColor={colors.info} />
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
  priceRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  priceCol: {
    flex: 1,
  },
  errorText: {
    ...typography.body,
    color: colors.danger,
  },
});
