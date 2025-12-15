# Mini Canvas Studio - Take-Home Assessment

## Overview

Welcome! This assessment evaluates your ability to work with a modern React/Three.js stack similar to our production codebase. You'll be building a **collaborative image canvas** where users can upload, position, and manage image layers.

**Time budget:** 2-3 hours
**Focus:** Quality over quantity. We'd rather see fewer features implemented well than everything done poorly.

---

## Tech Stack

This project uses technologies you'll work with daily:

- **Next.js 14** (App Router)
- **React Three Fiber** (Three.js in React)
- **MobX** (state management)
- **Socket.io** (real-time updates)
- **CSS Modules** with **BEM** naming convention
- **TypeScript** (strict mode)

---

## Getting Started

Copy the code from this repo into your own **private** repo. This should be where you complete the task.

```bash
# Install dependencies
pnpm install

# Start the mock WebSocket server (terminal 1)
pnpm run server

# Start the dev server (terminal 2)
pnpm run dev

# Open http://localhost:3000
```

---

## Your Tasks

### Core Requirements

#### 1. Implement the Layers Store (`src/stores/LayersStore.ts`)

Complete the MobX store that manages canvas layers. You'll need state for tracking layers and which one is selected, plus actions for adding, removing, updating positions, selecting, and reordering layers.

Think about how to efficiently derive sorted layers and the currently selected layer.

#### 2. Implement ImageLayer Component (`src/features/canvas/ui/ImageLayer.tsx`)

Create a React Three Fiber component that renders an image layer on the canvas:

- Load and display the image texture
- Position it according to the layer data
- Make it draggable and update the store when moved
- Handle visibility and opacity
- Indicate when the layer is selected

Consider what cleanup is needed when the component unmounts.

#### 3. Implement Upload Functionality (`src/features/toolbar/ui/UploadButton.tsx`)

The upload button should allow users to add images to the canvas. Think about file validation, generating unique IDs, and how the new layer integrates with your store.

#### 4. Implement Layers Panel (`src/features/layers-panel/ui/`)

Build out `LayersPanel.tsx` and `LayerItem.tsx` to display and manage layers:

- Show all layers with thumbnails
- Support selection, deletion, and reordering
- Handle the empty state

Use the provided CSS Module with BEM conventions for styling.

#### 5. Fix the Socket Bug & Wire Up Events

The provided `SocketStore.ts` has a bug that causes issues with Next.js. Identify and fix it.

Then connect the socket events to your layers store so that remote layer additions and movements are reflected in the UI. The mock server simulates another user making changes.

**Note:** Pay attention to how the server sends position data.

#### 6. Image Effect Processing

When a layer is selected, display an "Apply Effect" button above the image on the canvas. When clicked:

1. Send a request to the server via WebSocket to process the image
2. Show a loading/processing state while waiting
3. Handle the server response - on success, a new layer with the processed image should appear
4. Handle errors gracefully

The server supports `grayscale` and `blur` effects. See `src/shared/types/index.ts` for the relevant type definitions.

This tests your ability to:

- Render HTML UI elements positioned relative to 3D objects
- Handle async request/response flows over WebSockets
- Manage loading and error states
- Integrate new layers into your existing store

---

### Stretch Goals (If time permits)

- Undo/Redo for layer operations
- Layer opacity controls
- Visual selection outline on the canvas
- Keyboard shortcuts (delete, arrow keys for nudging)
- Performance optimizations
- Effect type selector (dropdown to choose between grayscale/blur)

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
├── features/               # Feature modules
│   ├── canvas/            # Three.js canvas feature
│   ├── toolbar/           # Top toolbar
│   └── layers-panel/      # Layer management panel
├── shared/                 # Shared utilities and components
│   ├── lib/               # Helpers (BEM, etc.)
│   ├── ui/                # Reusable UI components
│   └── types/             # TypeScript types
├── stores/                 # MobX stores
└── services/              # External service integrations
```

---

## What We're Looking For

- Working functionality
- Clean, well-organized code
- Proper TypeScript usage
- Appropriate MobX patterns
- Correct React patterns and cleanup
- Resource management in Three.js
- Consistent styling approach
- Handling of async operations and error states

---

## Required: NOTES.md

Please complete the provided `NOTES.md` file with your thoughts on:

1. What was most challenging
2. What you'd do with more time

---

## Technical Design Interview

After submission, we'll review your task. If progressed, we'll schedule a **90 minute technical interview** where a section of that will include walking us through your implementation, explaining your decisions, and discussing potential modifications.

Please ensure you understand all code you submit.

---

## AI Tool Usage

You may use AI assistants as you would in normal work. Please disclose what you used in `NOTES.md`. We're evaluating your problem-solving ability and understanding, not whether you avoided AI.

---

## Submission

1. Ensure both `pnpm run dev` and `pnpm run server` work
2. Complete the `NOTES.md` file
3. Document anything you didn't finish
4. Push all of your work and make sure your private repo is up-to-date.
5. Invite [will-gendo](https://github.com/will-gendo) and [ethan-gendo](https://github.com/ethan-gendo) to your private repo (and make sure they have at least read access).

---

## Questions?

Make reasonable assumptions and document them. We're evaluating your problem-solving approach as much as the final code.

Good luck!
