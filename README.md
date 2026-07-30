# GeoEase 🌍

> **AI-Powered Geospatial Assistant for Surveying Computations**
> Built for the *Build with Gemma: AI for Africa Hackathon – Minna 2026*

GeoEase is a robust, edge-optimized application designed to eliminate the mathematical bottlenecks in Geoinformatics. By bridging the gap between raw field data and finalized topographic models, GeoEase serves as an intelligent co-pilot for fast, accurate, and completely offline surveying computations.

---

## 🚀 The Problem
In the field of Surveying and Geoinformatics, professionals and students deal with tedious, error-prone manual calculations. Processing field data for extensive fieldwork—such as a 6.5km route survey, contouring, or coordinate-based area computations—can take hours of manual matrix operations and formula application. Furthermore, reliable internet is often nonexistent in remote field locations, rendering cloud-dependent mapping tools useless.

## 💡 The Solution
GeoEase automates heavy surveying computations and provides an intelligent interface for spatial analysis. Powered by **Google DeepMind's Gemma 4** (running entirely locally), users can input unstructured coordinate data and interact with an AI agent to instantly compute areas, generate spatial matrices, and visualize route maps without needing a server connection.

---

## ✨ Core Features

*   **🤖 Gemma 4-Powered Conversational Agent**
    *   Interact with your geospatial data using natural language.
    *   Leverages Gemma 4’s native function calling to parse unstructured coordinate data and execute complex calculations.
    *   Provides step-by-step mathematical breakdowns—perfect for verifying academic practicals and coursework.
*   **📐 Automated Coordinate & Area Computations**
    *   Instantly compute exact areas and boundary metrics from raw field coordinates.
    *   Eliminates manual mathematical errors associated with complex matrix operations and coordinate geometry.
*   **🗺️ Offline Route Mapping & Contouring**
    *   Process and visualize kilometers of route survey data alongside topographic contouring.
    *   Runs entirely on local hardware (Edge AI), ensuring complete functionality in low-connectivity environments.
*   **⚡ Privacy-First & Zero Latency**
    *   By utilizing Gemma 4's edge-optimized local inference, all data structuring and reasoning happens on the device.

---

## 🛠️ Tech Stack

*   **AI Integration:** Gemma 4 (E2B Edge Variant) for local inference and native function calling.
*   **Front-End:** Responsive web interface (HTML, CSS, JavaScript) optimized for offline use.
*   **Data Processing:** Custom spatial algorithms and matrix operation logic built for surveying metrics.

---

## 📥 Installation & Setup

Since GeoEase is designed as a local, edge-first application, you can run it directly on your machine without a cloud database setup.

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/GeoEase.git

# 2. Navigate to the project directory
cd GeoEase

# 3. Install dependencies
npm install

# 4. Download and link the local Gemma 4 model weights
# (Place the model file in the /models directory as per the local AI setup guide)

# 5. Start the local development server
npm run start
```

## 📊 Usage Example
1. Open the GeoEase dashboard.
2. Paste raw coordinate data into the input terminal (e.g., coordinates gathered from a recent SVG 308 field assignment).
3. Prompt the agent: *"Calculate the total area for these coordinates and show the matrix formula used."*
4. View the instant mathematical breakdown and the plotted boundary map on the interface.

---

## 🏆 Hackathon Track: Edge & Offline AI
GeoEase was developed specifically to address real-world infrastructural and educational challenges by providing a privacy-first, locally run AI solution capable of operating in low-connectivity environments across Africa.

---
*Developed with ❤️ at the Federal University of Technology, Minna.*
