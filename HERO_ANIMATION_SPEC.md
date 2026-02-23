# Hero Section - Premium Cinematic Animation Specification

## 🎬 Complete Animation Timeline (0s - 3.5s)

This document provides precise timing, easing, and implementation details for the Hero section's cinematic intro animation.

---

## 📊 Animation Stages Overview

```
STAGE 1: Intro (0s - 1.2s)
├─ Background gradient fade-in
├─ Radial highlight behind name
└─ Name scales + fades in

STAGE 2: Content Reveal (1.2s - 2.0s)
├─ Subtitle fade-up
├─ Paragraph fade-up  
├─ Buttons fade-up with stagger
└─ Shadow pop on arrival

STAGE 3: Visual Entry (2.0s - 3.5s)
├─ Floating Skill Stack slides in from right
├─ Pills animate into orbit positions
└─ Transition to continuous float

STAGE 4: Scroll-Triggered (On Viewport Enter)
└─ Tech chips row fade-in from left
```

---

## 🎯 Stage 1: Intro (0s - 1.2s)

### Background Gradient
```typescript
Duration: 1.2s
Delay: 0s
Easing: ease-out
Properties: opacity (0 → 1)

// Framer Motion
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 1.2, ease: 'easeOut' }}
```

### Radial Highlight (Behind Name)
```typescript
Duration: 1.0s
Delay: 0.3s
Easing: ease-out
Properties: opacity (0 → 1), scale (0.8 → 1.0)

// Framer Motion
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 1.0, delay: 0.3, ease: 'easeOut' }}
```

### Main Heading (Name)
```typescript
Duration: 1.2s
Delay: 0s
Easing: [0.22, 1, 0.36, 1] (ease-out-expo)
Properties: 
  - opacity (0 → 1)
  - scale (0.96 → 1.0)
  - translateY (20px → 0px)

// Framer Motion
initial={{ opacity: 0, scale: 0.96, y: 20 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
transition={{ 
  duration: 1.2, 
  delay: 0,
  ease: [0.22, 1, 0.36, 1] 
}}
```

### Ambient Orbs
```typescript
Top-right orb:
  Duration: 1.5s
  Delay: 0.5s
  opacity (0 → 1)

Bottom-left orb:
  Duration: 1.5s
  Delay: 0.7s
  opacity (0 → 1)
```

---

## 🎯 Stage 2: Content Reveal (1.2s - 2.0s)

### Availability Badge
```typescript
Duration: 0.5s
Delay: 0.6s
Easing: [0.22, 1, 0.36, 1]
Properties: opacity (0 → 1), translateY (10px → 0)

// Badge dot pulsing animation (infinite loop):
animate={{ scale: [1, 1.2, 1] }}
transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
```

### Subtitle ("Full-Stack Developer")
```typescript
Duration: 0.6s
Delay: 1.2s (stagger: +80ms from name)
Easing: [0.22, 1, 0.36, 1]
Properties: opacity (0 → 1), translateY (15px → 0)

// Framer Motion
initial={{ opacity: 0, y: 15 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
```

### Description Paragraph
```typescript
Duration: 0.6s
Delay: 1.32s (stagger: +120ms from subtitle)
Easing: [0.22, 1, 0.36, 1]
Properties: opacity (0 → 1), translateY (15px → 0)
```

### Buttons Container
```typescript
Duration: 0.6s
Delay: 1.44s (stagger: +120ms from paragraph)
Easing: [0.22, 1, 0.36, 1]
Properties: opacity (0 → 1), translateY (15px → 0)
```

### Individual Buttons (Nested stagger)
```typescript
Button 1 (Primary "View My Work"):
  Duration: 0.5s
  Delay: 1.56s
  scale (0.96 → 1.0)
  
Button 2 (Secondary "Get in Touch"):
  Duration: 0.5s
  Delay: 1.68s (stagger: +120ms)
  scale (0.96 → 1.0)

Button 3 (Ghost "Resume"):
  Duration: 0.5s
  Delay: 1.8s (stagger: +120ms)
  scale (0.96 → 1.0)
```

---

## 🎯 Stage 3: Visual Entry (2.0s - 3.5s)

### Floating Skill Stack - Central Card
```typescript
Duration: 0.8s
Delay: 2.0s
Easing: [0.34, 1.56, 0.64, 1] (ease-out-back with slight bounce)
Properties:
  - opacity (0 → 1)
  - scale (0.8 → 1.0)
  - translateX (30px → 0)

// Framer Motion
initial={{ opacity: 0, scale: 0.8, x: 30 }}
animate={{ opacity: 1, scale: 1, x: 0 }}
transition={{ 
  duration: 0.8, 
  delay: 2.0,
  ease: [0.34, 1.56, 0.64, 1]
}}

// Continuous float (starts after initial animation):
animate={{ y: [0, -6, 0] }}
transition={{
  duration: 5,
  repeat: Infinity,
  ease: 'easeInOut',
}}
```

### Ambient Glow (Behind Stack)
```typescript
Duration: 1.2s
Delay: 2.0s
Easing: [0.34, 1.56, 0.64, 1]
Properties: opacity (0 → 1), scale (0.8 → 1.0)
```

### Floating Skill Pills (6 items)

**Timing Pattern:**
```typescript
Base delay: 2.0s
Individual stagger: 0s, 0.15s, 0.3s, 0.1s, 0.2s, 0.25s

Duration: 0.7s per pill
Easing: [0.34, 1.56, 0.64, 1]
```

**Properties per pill:**
```typescript
initial={{ 
  opacity: 0, 
  scale: 0.5, 
  x: 30,  // Slides in from right
  y: 0 
}}
animate={{
  opacity: [depthOpacity], // 0.85-1.0 based on depth
  scale: [depthScale],      // 0.88-1.0 based on depth
  x: [targetX],             // Final orbit position
  y: [targetY],             // Final orbit position
}}
transition={{
  duration: 0.7,
  delay: 2.0 + [individual delay],
  ease: [0.34, 1.56, 0.64, 1],
}}
```

**Depth Layers:**
- **Near pills** (scale: 1.0, opacity: 1.0, blur: 0px)
- **Mid pills** (scale: 0.94, opacity: 0.92, blur: 0px)
- **Far pills** (scale: 0.88, opacity: 0.85, blur: 0.3px)

**Continuous Float Animation:**
```typescript
animate={{
  y: [0, -2 to -4, 0], // Varies by depth
}}
transition={{
  duration: 3.5 + (index * 0.3), // Each pill has unique timing
  repeat: Infinity,
  ease: 'easeInOut',
}}
```

### Orbit Rings
```typescript
Inner ring:
  Duration: 1.5s
  Delay: 2.2s
  opacity (0 → 0.15), scale (0.8 → 1.0)

Outer ring:
  Duration: 1.5s
  Delay: 2.4s
  opacity (0 → 0.1), scale (0.8 → 1.0)
```

---

## 🎯 Stage 4: Scroll-Triggered (Tech Chips)

### Tech Stack Pills (6 items)
```typescript
Trigger: When viewport enters (30% visible)
Stagger: 80ms per chip
Duration: 0.5s per chip
Easing: [0.22, 1, 0.36, 1]

// Container variants
variants={{
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    }
  }
}}

// Individual chip variants
variants={{
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}}
```

---

## 🎨 Micro-Interactions (Hover/Focus States)

### Primary Button ("View My Work")
```typescript
Hover:
  Duration: 200ms
  scale: 1.0 → 1.03
  shadow: md → xl
  gradient: slightly brighter

// Framer Motion
whileHover={{ 
  scale: 1.03,
  transition: { duration: 0.2 }
}}

Tap:
  scale: 0.98
  
// CSS
transition: all 250ms ease
```

### Secondary Button ("Get in Touch")
```typescript
Hover:
  Duration: 250ms
  background: transparent → #2E2E2E
  color: #2E2E2E → white
  border: #6B7280 → #2E2E2E
  scale: 1.0 → 1.03

// Framer Motion
whileHover={{ 
  scale: 1.03,
  transition: { duration: 0.2 }
}}

// CSS
className="hover:bg-[#2E2E2E] hover:text-white hover:border-[#2E2E2E] transition-all duration-250"
```

### Tech Stack Pills
```typescript
Hover:
  Duration: 200ms
  translateY: 0 → -4px
  background: rgba(74, 144, 226, 0.05) → rgba(74, 144, 226, 0.12)
  border: gray-200/60 → blue-300/40

// Framer Motion
whileHover={{ 
  y: -4, 
  backgroundColor: 'rgba(74, 144, 226, 0.12)',
  borderColor: 'rgba(74, 144, 226, 0.4)',
  transition: { duration: 0.2 } 
}}
```

### Floating Skill Pills
```typescript
Hover:
  Duration: 200ms
  scale: 1.0 → 1.08
  translateY: current → -6px
  Icon scale: 1.0 → 1.1
  Glow opacity: 0 → 1

// Framer Motion
whileHover={{
  scale: 1.08,
  y: -6,
  transition: { duration: 0.2 }
}}

// Icon
className="group-hover:scale-110 transition-transform duration-200"

// Glow
className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
```

---

## 📱 Mobile Responsiveness

### Layout Changes
```
Desktop (lg:):
  - Two-column grid (text | visual)
  - FloatingSkillStack visible

Mobile (<lg):
  - Single column stack
  - FloatingSkillStack hidden (display: none)
  - Buttons full-width
```

### Animation Adjustments (Mobile)
- All timings remain the same
- Transform distances reduced slightly:
  - Name translateY: 15px (vs 20px desktop)
  - Pills translateX: -15px (vs -20px desktop)
- No performance-heavy effects removed (already optimized)

---

## 🎯 Easing Function Reference

```typescript
// Custom Bezier Curves
ease-out-expo: [0.22, 1, 0.36, 1]
  - Smooth, premium deceleration
  - Used for: text, buttons, major elements

ease-out-back: [0.34, 1.56, 0.64, 1]
  - Slight bounce/overshoot effect
  - Used for: floating pills, glassmorphism card

linear: [0, 0, 1, 1]
  - Constant speed
  - Used for: loader rotation only

easeInOut: Built-in Framer Motion
  - Symmetrical acceleration/deceleration
  - Used for: continuous float animations
```

---

## ⚡ Performance Optimization

### GPU-Accelerated Properties Only
✅ **Animating:**
- `opacity`
- `transform` (translateX, translateY, scale)

❌ **NOT Animating:**
- `width`, `height`
- `margin`, `padding`
- `border-width`
- `color` (except via CSS transitions)

### Animation Layers
```css
/* Framer Motion automatically adds will-change, but for reference: */
will-change: transform, opacity;

/* Promote to own layer: */
transform: translateZ(0);
```

### Reduced Motion Support
```typescript
// Respect user preferences
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  // Disable all animations, show final state immediately
  return <StaticHero />;
}
```

---

## 🎬 Complete Timeline Visualization

```
TIME (seconds)
0.0 ─────┬─────────────────────────────────────────────────
         │ ▶ Background gradient fades in
0.3 ─────┼─────────────────────────────────────────────────
         │ ▶ Radial highlight fades in
0.5 ─────┼─────────────────────────────────────────────────
         │ ▶ Top-right orb appears
0.6 ─────┼─────────────────────────────────────────────────
         │ ▶ Availability badge fades in
0.7 ─────┼─────────────────────────────────────────────────
         │ ▶ Bottom-left orb appears
1.2 ─────┼─────────────────────────────────────────────────
         │ ✓ Name animation COMPLETE
         │ ▶ Subtitle fades up
1.32 ────┼─────────────────────────────────────────────────
         │ ▶ Description paragraph fades up
1.44 ────┼─────────────────────────────────────────────────
         │ ▶ Buttons container fades up
1.56 ────┼─────────────────────────────────────────────────
         │ ▶ Button 1 scales in
1.68 ────┼─────────────────────────────────────────────────
         │ ▶ Button 2 scales in
1.8 ─────┼─────────────────────────────────────────────────
         │ ▶ Button 3 scales in
2.0 ─────┼─────────────────────────────────────────────────
         │ ✓ All left-side content COMPLETE
         │ ▶ Central glassmorphism card slides in
         │ ▶ Ambient glow appears
         │ ▶ Floating pill 1 starts
2.1 ─────┼─────────────────────────────────────────────────
         │ ▶ Floating pill 4 starts
2.15 ────┼─────────────────────────────────────────────────
         │ ▶ Floating pill 2 starts
2.2 ─────┼─────────────────────────────────────────────────
         │ ▶ Floating pill 5 starts
         │ ▶ Inner orbit ring fades in
2.25 ────┼─────────────────────────────────────────────────
         │ ▶ Floating pill 6 starts
2.3 ─────┼─────────────────────────────────────────────────
         │ ▶ Floating pill 3 starts
2.4 ─────┼─────────────────────────────────────────────────
         │ ▶ Outer orbit ring fades in
2.8 ─────┼─────────────────────────────────────────────────
         │ ✓ Central card animation complete
3.0 ─────┼─────────────────────────────────────────────────
         │ ✓ All pills in orbit position
3.5 ─────┼─────────────────────────────────────────────────
         │ ✓ HERO INTRO COMPLETE
         │ ▶ Continuous float animations begin (infinite loop)
─────────┴─────────────────────────────────────────────────
```

---

## 📋 Implementation Checklist

### Required Dependencies
- [x] `motion` (Framer Motion) - already installed
- [x] `lucide-react` - for icons
- [x] `tailwindcss` - for styling

### Component Files
- [x] `/src/app/components/FloatingSkillStack.tsx`
- [x] `/src/app/pages/Home.tsx` (Hero section)

### CSS/Styling
- [x] Tailwind v4 utility classes
- [x] Custom gradients via inline styles
- [x] Backdrop-blur for glassmorphism
- [x] Box-shadow with inset highlights

### Animation Features
- [x] Staggered reveals with precise timing
- [x] Depth layering (near/mid/far pills)
- [x] Continuous infinite loops (float, pulse)
- [x] Viewport-triggered animations (IntersectionObserver)
- [x] Micro-interactions (hover, tap)

---

## 🚀 Total Hero Load Time: **3.5 seconds**

After this, all animations transition to subtle continuous effects:
- Floating skill pills (ultra-slow vertical movement)
- Pulsing availability badge dot
- Hover/interaction states ready

**Result:** A smooth, premium, cinematic intro that feels intentional and polished, not flashy or distracting. ✨
