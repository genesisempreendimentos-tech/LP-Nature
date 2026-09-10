# Nature Residencial - Design Guidelines

## Aesthetic Stance
**Minimalist Architectural**
A sophisticated, mature, and nature-integrated aesthetic for high-end real estate. Prioritizes extreme whitespace, intentional typographic contrast, and restrained motion. It avoids any generic SaaS patterns (no rounded colorful cards, no blues/purples, no arbitrary bento boxes). The composition feels like an editorial magazine merged with a premium architectural portfolio.

## Typography
- **Display**: Playfair Display (Serif, elegant, mature)
- **Body**: Inter (Clean, highly legible neo-grotesque)

## Color Palette
Earthy, natural, and subdued tones:
- **Background**: Soft off-white (warm, architectural stone/paper) - `#F9F8F6`
- **Background Alt**: Slightly darker stone - `#F0EFEB`
- **Surface**: Pure white for contrast - `#FFFFFF`
- **Text Primary**: Deep charcoal/forest green (near black) - `#1A1C1A`
- **Text Muted**: Warm gray - `#757470`
- **Accent**: Muted terracotta or dark olive for minimal interactions - `#5C6450`

## Spacing & Structure
- **Grid**: 12-column desktop grid with generous outer margins.
- **Section Spacing**: Vast vertical gaps (min 150px on desktop) to let content breathe.
- **Cards/Containers**: No floating drop shadows. Flat, flush to background, separated by minimal 1px borders or just whitespace.

## Motion
- GSAP-driven. ScrollTrigger for narrative progression.
- `RevealText` with `clip-path` masks for headlines (moving up to 0).
- Extreme subtlety in parallax and image scaling (e.g., 1.04 -> 1).
- Fallbacks for mobile and `prefers-reduced-motion`.
