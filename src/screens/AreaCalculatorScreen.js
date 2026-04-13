import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ActionButton from '../components/ActionButton';
import InputField from '../components/InputField';
import PickerField from '../components/PickerField';
import { ResultCard, ResultDivider, ResultHighlight, ResultRow } from '../components/ResultCard';
import ScreenWrapper from '../components/ScreenWrapper';
import { colors, spacing, typography } from '../theme/colors';
import { calculateArea, calculatePricing } from '../utils/calculations';

const unitOptions = [
  { label: 'mm', value: '1000' },
  { label: 'cm', value: '100' },
  { label: 'm', value: '1' },
];

export default function AreaCalculatorScreen() {
  const [naziv, setNaziv] = useState('');
  const [indeks, setIndeks] = useState('1000');
  const [nabavna, setNabavna] = useState('');
  const [izlazna, setIzlazna] = useState('');
  const [rows, setRows] = useState([{ width: '', height: '', quantity: '1' }]);
  const [result, setResult] = useState(null);

  const addRow = () => {
    setRows([...rows, { width: '', height: '', quantity: '1' }]);
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const updateRow = (index, field, value) => {
    const updated = [...rows];
    updated[index] = { ...updated[index], [field]: value };
    setRows(updated);
  };

  const calculate = () => {
    const { results, totalM2 } = calculateArea(rows, indeks);
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
      <Text style={styles.screenTitle}>Izračun m²</Text>

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

      <Text style={styles.sectionLabel}>DIMENZIJE</Text>
      {rows.map((row, index) => (
        <View key={index} style={styles.dimensionRow}>
          <View style={styles.dimInput}>
            <InputField placeholder="Širina" value={row.width} onChangeText={(v) => updateRow(index, 'width', v)} keyboardType="decimal-pad" />
          </View>
          <Text style={styles.dimX}>×</Text>
          <View style={styles.dimInput}>
            <InputField placeholder="Visina" value={row.height} onChangeText={(v) => updateRow(index, 'height', v)} keyboardType="decimal-pad" />
          </View>
          <Text style={styles.dimX}>×</Text>
          <View style={styles.dimInputSmall}>
            <InputField placeholder="Kol." value={row.quantity} onChangeText={(v) => updateRow(index, 'quantity', v)} keyboardType="number-pad" />
          </View>
          {rows.length > 1 && (
            <TouchableOpacity onPress={() => removeRow(index)} style={styles.removeBtn}>
              <Text style={styles.removeBtnText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <View style={styles.buttonRow}>
        <ActionButton title="+ Dodaj red" onPress={addRow} variant="ghost" style={styles.addBtn} />
        <ActionButton title="Izračunaj" onPress={calculate} style={styles.calcBtn} />
      </View>

      {result && (
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
              label={`${r.width} × ${r.height} (×${r.quantity})`}
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
  sectionLabel: {
    ...typography.caption,
    color: colors.textMuted,
    letterSpacing: 2,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  dimensionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: -spacing.sm,
  },
  dimInput: {
    flex: 3,
  },
  dimInputSmall: {
    flex: 2,
  },
  dimX: {
    color: colors.textMuted,
    fontSize: 18,
    marginBottom: spacing.md,
  },
  removeBtn: {
    marginBottom: spacing.md,
    padding: spacing.sm,
  },
  removeBtnText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  addBtn: {
    flex: 1,
  },
  calcBtn: {
    flex: 1,
  },
});
