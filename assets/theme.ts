import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export default definePreset(Aura, {
  semantic: {
    lorcana: {
      indigo: "#373b70",
      gold: "#d3ba84",
      parchment: '#e3caa8',
      kelp: "#1c1c1a"
    },
    primary: {
      50: '{orange.50}',
      100: '{orange.100}',
      200: '{orange.200}',
      300: '{orange.300}',
      400: '{orange.400}',
      500: '{orange.500}',
      600: '{orange.600}',
      700: '{orange.700}',
      800: '{orange.800}',
      900: '{orange.900}',
      950: '{orange.950}'
    },
    light: {
      surface: {
        0: '#ffffff',
        50: '{slate.50}',
        100: '{slate.100}',
        200: '{slate.200}',
        300: '{slate.300}',
        400: '{slate.400}',
        500: '{slate.500}',
        600: '{slate.600}',
        700: '{slate.700}',
        800: '{slate.800}',
        900: '{slate.900}',
        950: '{slate.950}'
      }
    },
    dark: {
      surface: {
        0: '#ffffff',
        50: '{slate.50}',
        100: '{slate.100}',
        200: '{slate.200}',
        300: '{slate.300}',
        400: '{slate.400}',
        500: '{slate.500}',
        600: '{slate.600}',
        700: '{slate.700}',
        800: '{slate.800}',
        900: '{slate.900}',
        950: '{slate.950}'
      }
    }
  }
});
