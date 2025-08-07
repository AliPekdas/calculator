import { View, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function HomeScreen() {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');
  const [input, setInput] = useState('');

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const buttons = [
    ['C', '+/-', '%', '/'],
    ['7', '8', '9', 'x'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['.', '0', '<--', '='],
  ];

  const handlePress = (value: string) => {
    if (value === 'C') {
      setInput('');
    } else if (value === '<--') {
      setInput((prev) => prev.slice(0, -1));
    } else if (value === '+/-') {
      if (input.startsWith('-')) {
        setInput(input.slice(1));
      } else {
        setInput('-' + input);
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleEquals = () => {
    try {
      const sanitizedInput = input.replace(/x/g, '*');
      const result = eval(sanitizedInput);
      setInput(String(result));
    } catch {
      setInput('Error');
    }
  };

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000000' : '#FFFFFF' },
      ]}
    >
      {/* Theme Toggle Button */}
      <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
        <ThemedText style={{ color: isDarkMode ? 'white' : 'black' }}>
          {isDarkMode ? 'Light ☀' : 'Dark 🌙'}
        </ThemedText>
      </TouchableOpacity>

      <ThemedText
        style={[
          styles.display,
          { color: isDarkMode ? '#FFFFFF' : '#000000' },
        ]}
      >
        {input}
      </ThemedText>

      {buttons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((btn, index) => {
            const isLastColumn = index === 3;
            const isFirstRow = rowIndex === 0 && index !== 3;

            let backgroundColor = isDarkMode ? '#222' : '#ddd';

            if (isLastColumn) backgroundColor = '#512effff';
            else if (isFirstRow) backgroundColor = '#686576ff';

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  { backgroundColor },
                ]}
                onPress={() => (btn === '=' ? handleEquals() : handlePress(btn))}
              >
                <ThemedText
                  style={[
                    styles.text,
                    { color: isDarkMode ? '#fff' : '#000' },
                  ]}
                >
                  {btn}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'flex-end',
  },
  themeToggle: {
    fontSize: 20,
    alignSelf: 'flex-end',
    marginBottom: 150,
    padding: 10,
  },
  display: {
    fontSize: 60,
    fontWeight: '300',
    textAlign: 'right',
    marginBottom: 20,
    marginRight: 10,
    paddingVertical: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '300',
  },
});
