# Melies.ai Design System

The visual language of Melies.ai. A blend of cinematic elegance and technical precision.

## 01. Colors

| Name    | Hex       | Tailwind Class | Usage |
| :------ | :-------- | :------------- | :---- |
| **Ink** | `#080808` | `bg-ink`       | Primary Background |
| **Paper**| `#F5F2EB`| `bg-[#F5F2EB]` | Light Backgrounds / Contrast |
| **Cobalt**| `#2563EB`| `bg-cobalt`    | Primary Action / Tech |
| **Rose**  | `#F43F5E`| `bg-rose-500`  | Emotion / Highlight |
| **Amber** | `#F59E0B`| `bg-amber-500` | Warning / Memory |
| **Emerald**| `#10B981`| `bg-emerald-500`| Success / Logic |

## 02. Typography

### Display / H1
*   **Font**: Inter / Sans-serif
*   **Weight**: Medium (500)
*   **Tracking**: Tighter (`tracking-tighter`)
*   **Usage**: Hero sections, major statements.

### Heading / H2
*   **Font**: Inter / Sans-serif
*   **Weight**: Medium (500)
*   **Usage**: Section headers.

### Body / P
*   **Font**: Inter / Sans-serif
*   **Color**: `text-white/60` (on dark), `text-ink/60` (on light)
*   **Usage**: General text.

### Monospace
*   **Font**: JetBrains Mono / Monospace
*   **Usage**: Technical details, system status, code snippets.

## 03. Components

### Buttons
*   **Primary**: Solid color (Cobalt/White), rounded corners.
*   **Secondary**: Transparent with border.
*   **Retro**: "Relief" style with shadow for depth.

### Cards
*   **Standard Card**: `bg-[#111]`, `border-white/10`. Used for features.
*   **Sunken Canvas**: `bg-[#050505]`, `shadow-inner`. Used for interactive demos.

## 04. Layout & Backgrounds
- **Primary Background**: The default page background is **#F0ECE2** (Global Light).
- **Section Backgrounds**: Major content sections MUST be transparent to let the global background show through. **NO** distinct background colors for sections (e.g., do NOT use `bg-[#F0ECE2]`).
- **Visual Containers**: Schemas and diagrams MUST be contained in a **Light Sunken Canvas** (`sunken-canvas` class).
    - **Style**: `bg-[#F0ECE2]` (or transparent), `shadow-inner`, `rounded-3xl`.
    - **Forbidden**: Do NOT use dark backgrounds (black/blue) for schemas unless explicitly required for a specific "cinematic mode" (rare).
- **Contrast Rule**: Inside Light Sunken Canvas, use **Ink (#080808)** for all text, borders, and icons.
- **Grid**: Subtle linear gradients can be used for internal grids, but keep them very faint (`opacity-5` or `opacity-10`).

## 05. Principles

### Melies Magic
Every interaction should feel magical. Use subtle glows, smooth transitions, and "alive" states.

### Depth & Layering
Use "Sunken Canvas" for workspaces and "Floating Cards" for tools. Create a sense of physical space.

### Cinematic Focus
Guide the user's eye with lighting and contrast. The interface should feel like a movie set.
