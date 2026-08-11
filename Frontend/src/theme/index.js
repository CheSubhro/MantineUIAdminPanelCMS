
// Example index.js

import { colors } from './colors';
import { typography } from './typography';

const theme = extendTheme({
    colors,
    fonts: {
        body: typography.fontFamily,
        heading: typography.fontFamily,
    },
  
});

export default theme;