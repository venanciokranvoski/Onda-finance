import '@testing-library/jest-native/extend-expect';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
  Feather: "Feather",
  MaterialCommunityIcons: "MaterialCommunityIcons",
  FontAwesome: "FontAwesome",
  FontAwesome5: "FontAwesome5",
  FontAwesome6: "FontAwesome6",
  MaterialIcons: "MaterialIcons",
}));

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
}));

jest.mock('expo-asset', () => ({
  Asset: { fromModule: jest.fn(() => ({ downloadAsync: jest.fn() })) },
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

