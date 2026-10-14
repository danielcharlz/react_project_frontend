// Design tokens from the "Developer Handsoff.pdf" (colors + DM Sans type scale).

export const colors = {
  primaryDark: '#027878', // logo, active tab icon
  primary: '#02B6B6', // buttons
  primaryLight: '#F1FAFA', // "Connects" backgrounds
  textPrimary: '#29292B',
  textSecondary: '#7F7F80',
  border: '#EEEEEF',
  outline: '#D9D9DA', // outlined button border (measured from the Discover screen)
  backgroundLight: '#F8F8F9',
  white: '#FFFFFF',
  error: '#D93025',
};

export const fonts = {
  regular: 'DMSans_400Regular',
  medium: 'DMSans_500Medium',
  bold: 'DMSans_700Bold',
};

// Type scale (sizes in dp). Use with: style={[typography.h3, { color: ... }]}
export const typography = {
  h1: { fontFamily: fonts.bold, fontSize: 24 },
  h2: { fontFamily: fonts.bold, fontSize: 20 },
  h3: { fontFamily: fonts.bold, fontSize: 16 },
  b1: { fontFamily: fonts.medium, fontSize: 16 },
  b2: { fontFamily: fonts.regular, fontSize: 14 },
  cta: { fontFamily: fonts.bold, fontSize: 16 },
};
