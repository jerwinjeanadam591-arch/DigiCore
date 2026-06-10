# CSS Variables Reference - Professional Styling

## Color System

```css
:root {
    /* Primary Colors */
    --primary-color: #0066cc;        /* Professional Blue */
    --primary-light: #e6f0ff;        /* Light Blue Background */
    --secondary-color: #004a99;      /* Dark Blue */
    
    /* Status Colors */
    --accent-color: #ff5555;         /* Attention/Alert Red */
    --success-color: #2ecc71;        /* Success Green */
    --warning-color: #f39c12;        /* Warning Orange */
    --danger-color: #e74c3c;         /* Danger Red */
    
    /* Backgrounds & Text */
    --light-bg: #f7f9fc;             /* Off-white Background */
    --dark-text: #1a1a2e;            /* Near Black Text */
    --light-text: #6c757d;           /* Gray Text */
    --border-color: #d1d5db;         /* Light Gray Border */
    
    /* Shadows (Three-Tier System) */
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
    --shadow-md: 0 8px 16px rgba(0, 0, 0, 0.12);
    --shadow-lg: 0 12px 24px rgba(0, 0, 0, 0.15);
    
    /* Timing Functions */
    --transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --transition-fast: all 0.2s ease;
}
```

## Usage Examples

### Buttons
```css
.btn-primary {
    background: linear-gradient(135deg, var(--primary-color), #0052a3);
    color: white;
    box-shadow: var(--shadow-md);
}

.btn-primary:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-3px);
}
```

### Cards
```css
.card {
    background: white;
    border: 1.5px solid var(--border-color);
    border-radius: 12px;
    box-shadow: var(--shadow-sm);
    transition: var(--transition);
}

.card:hover {
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
}
```

### Text
```css
.heading {
    color: var(--dark-text);
    font-weight: 700;
}

.description {
    color: var(--light-text);
    font-weight: 400;
}
```

## Animation Classes

### Fade In Up Animation
```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### Utility Classes
```css
.pulse-animation {
    animation: pulse 2s infinite;
}

.loading-animation {
    animation: shimmer 2s infinite;
}
```

## Responsive Breakpoints

- **Extra Small**: max-width 359px
- **Small Mobile**: max-width 480px
- **Tablet**: min-width 769px, max-width 1024px
- **Medium**: min-width 1025px, max-width 1199px
- **Large**: min-width 1200px

## Typography Scale

| Element | Size | Weight | Letter-spacing |
|---------|------|--------|-----------------|
| H1 | 3.2rem | 800 | -1px |
| H2 | 2.5rem | 700 | -0.5px |
| H3 | 1.3rem | 700 | normal |
| H4 | 1.1rem | 600 | normal |
| Body | 1rem | 400 | -0.3px |
| Small | 0.9rem | 400 | normal |

## Font Families

- **Headings**: 'Poppins', sans-serif
- **Body**: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif

## Shadow Depths

| Depth | Use Case | CSS |
|-------|----------|-----|
| Small | Subtle depth, resting state | `var(--shadow-sm)` |
| Medium | Cards, moderate lift | `var(--shadow-md)` |
| Large | Interactive, hover state | `var(--shadow-lg)` |

## Spacing Scale

- **xs**: 8px
- **sm**: 12px
- **md**: 20px
- **lg**: 30px
- **xl**: 50px
- **2xl**: 80px

## Transition Speeds

- **Fast**: 0.2s (micro-interactions, underlines)
- **Normal**: 0.3s (cards, buttons, links)
- **Slow**: 0.6s+ (page load animations, staggered effects)

---

**Reference for developers** - Use these variables consistently across the entire project.
