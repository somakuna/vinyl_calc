import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

export default function ScreenWrapper({ children, scrollable = true }) {
  const Container = scrollable ? ScrollView : View;
  const containerProps = scrollable
    ? { contentContainerStyle: styles.scrollContent, keyboardShouldPersistTaps: 'handled' }
    : { style: styles.viewContent };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Container {...containerProps}>{children}</Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  viewContent: {
    flex: 1,
    padding: 20,
  },
});
