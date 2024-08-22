import { StyleSheet } from 'react-native';

import { theme } from './colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 100,
  },
  text: {
    fontSize: 32,
    fontWeight: 600,
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    fontSize: 16,
  },
  line: {
    borderRadius: 20,
    marginTop: 20,
    padding: 16,
    gap: 12,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lineDate: {
    textAlign: 'right',
    fontSize: 12,
    color: theme.white,
  },
  lineText: {
    flex: 1,
    color: theme.white,
    fontSize: 16,
    lineHeight: 24,
  },
  lineDoneBtn: {
    width: 80,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 600,
    color: theme.white,
    lineHeight: 24,
  },
});
