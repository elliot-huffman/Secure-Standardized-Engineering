---
title: Home
description: Landing page for the set of documentation on how to securely code and design in a standardized way.
icon: lucide/house
hide:
    - navigation
    - toc
    - footer
---

## Overview

This set of guidelines is designed to ensure that software development, and infrastructure projects are secure from the outset, reducing the risk of vulnerabilities, insider threats and generally following the assume breach mindset.

Non-security code styles and design patterns are also included in each set of guides to ensure that code is consistent, and readable. Readability is meant to encompass people from a non-technical background (but with an expectation of logical thought) as well as LLMs.

## Credentials

Why should you trust me? That is not for this site to go in-depth over, check out this one instead:
<br>[https://elliot.huffman.me](https://elliot.huffman.me){:target="_blank"}

## Navigation

Please select a system to learn more about it:

<!-- markdownlint-disable-next-line MD033 -->
<div class="grid cards" markdown>

- :fontawesome-solid-share-nodes: __General/Shared__

    ---

    Constant concepts and patterns to use across all systems/projects.

    [:octicons-arrow-right-24: Overview](./Constants/index.md){ data-preview }

- :fontawesome-brands-typescript: __TypeScript__

    ---

    TypeScript/JavaScript language best practices and recommended style guides.

    [:octicons-arrow-right-24: Getting started](./TypeScript/index.md){ data-preview }

- :fontawesome-brands-github: __GitHub__ (Coming soon!)

    ---

    GitHub Enterprise, Org, Repo, and Infrastructure best practices.

    <!-- [:octicons-arrow-right-24: Getting started](./GitHub/index.md){ data-preview } -->

- :fontawesome-solid-terminal: __PowerShell__ (Coming soon!)

    ---

    PowerShell language best practices and recommended style guides.

    <!-- [:octicons-arrow-right-24: Getting started](./PowerShell/index.md){ data-preview } -->

- :fontawesome-brands-microsoft: __Azure__ (Coming soon!)

    ---

    Azure Security Best Practices and recommended governance.

    <!-- [:octicons-arrow-right-24: Getting started](./PowerShell/index.md){ data-preview } -->

</div>

---

## Why the choice in name?

I started with the acronym SSE from the CPU instruction set called SSE (Streaming SIMD Extensions). Then I worked backward to a logical name for the project. I am a nerd, what can I say? 🤓

<!-- HTML Starfield for the home page background -->
<canvas id="warpCanvas" aria-hidden="true" role="presentation"></canvas>
<script>
    // Run the star field attractor animation
    (function () {
        /** Instance of the canvas element that the warp speed animation will be rendered on. */
        const canvas = document.getElementById("warpCanvas");

        // If the element is not a canvas, log an error and return early
        if (!(canvas instanceof HTMLCanvasElement)) {
            // Log an error message to the console
            console.error("Canvas element not found or invalid.");

            // Stop execution to prevent fall through
            return;
        }

        /** 2D rendering context for the canvas. */
        const renderingContext = canvas.getContext("2d");

        // If unable to obtain 2D rendering context, log an error and return early
        if (!renderingContext) {
            // Log an error message to the console
            console.error("Unable to obtain 2D rendering context.");

            // Stop execution to prevent fall through
            return;
        }

        /** Current width of the window in pixels. */
        let windowWidth = window.innerWidth;

        /** Current height of the window in pixels. */
        let windowHeight = window.innerHeight;

        // Set the canvas width to match the window width
        canvas.width = windowWidth;

        // Set the canvas height to match the window height
        canvas.height = windowHeight;

        /** Count of stars to render on the screen. */
        const starCount = 800;

        /**
         * List of colors to pseudo-randomly assign to stars for visual variety.
         *
         * Where the key is the color.
         * Where the value is the random chance weight for that color. The higher the number, the more likely that color will be chosen.
         */
        const starColorList = {
            "#ffffff": 1, // White
            "#fccc4a": .01,
            "#f9413c": .01,
            "#f8f775": .01,
            "#ffffa5": .01,
            "#cbcbfb": .01,
            "#9a99fb": .01
        }

        /** Helper function to pick a color based on weighted probability. */
        function getWeightedRandomColor(colorMap) {
            // 1. Calculate the total sum of all weights
            let totalWeight = 0;

            // Sum each color's weight to get the total weight for random selection
            for (const color in colorMap) { totalWeight += colorMap[color]; }

            // 2. Pick a random number between 0 and the total weight
            let random = Math.random() * totalWeight;

            // 3. Iterate through the colors and subtract their weight from the random number
            for (const color in colorMap) {
                // If the random number is less than the current color's weight, return that color
                if (random < colorMap[color]) { return color; }

                // Subtract the current color's weight from the random number and continue to the next color
                random -= colorMap[color];
            }

            // Fallback to the first color in case of rounding errors
            return Object.keys(colorMap)[0];
        }

        /** List of stars that are rendering. */
        const starList = [];

        // Initialize stars with random positions
        function initStars() {
            // Initialize a new set of stars based on the requested count
            for (let i = 0; i < starCount; i++) {
                // Generate a new star and put it into the star array
                starList.push({
                    'x': (Math.random() - 0.5) * windowWidth,
                    'y': (Math.random() - 0.5) * windowHeight,
                    'z': Math.random() * windowWidth,
                    'speed': Math.random(),
                    'color': getWeightedRandomColor(starColorList)
                });
            }
        }

        // Update canvas size on resize
        function resizeCanvas() {
            // Gracefully resize the canvas and reinitialize stars to fit the new window size
            try {
                // Re-capture the new window dimensions
                windowWidth = window.innerWidth;
                windowHeight = window.innerHeight;

                // Update the canvas dimensions to match the new window size
                canvas.width = windowWidth;
                canvas.height = windowHeight;

                // Clear the stars array and reinitialize stars to fit the new window size
                starList.length = 0;

                // Re-initialize stars to fit the new window size
                initStars();
            } catch (error) {
                // Log any errors that occur during the resize operation
                console.error("Resize error:", error);
            }
        }

        // Ensure that the canvas gets updated when the window is resized
        window.addEventListener("resize", resizeCanvas);

        // Initialize stars for the first time
        initStars();

        // Update and draw stars each frame
        function animate() {
            try {
                // Set the background color to black
                renderingContext.fillStyle = "black";

                // Clear the entire canvas
                renderingContext.fillRect(0, 0, windowWidth, windowHeight);

                // Render the current list of stars
                for (const star of starList) {
                    star.z -= star.speed;

                    // Set the star color to white
                    renderingContext.fillStyle = star.color;

                    // If the star has moved past the viewer, reset it to a new random position at the far end of the field
                    if (star.z <= 0) {
                        star.x = (Math.random() - 0.5) * windowWidth;
                        star.y = (Math.random() - 0.5) * windowHeight;
                        star.z = windowWidth;
                    }

                    const k = 128 / star.z;
                    const px = star.x * k + windowWidth / 2;
                    const py = star.y * k + windowHeight / 2;

                    // Only draw the star if it's within the bounds of the canvas
                    if (px >= 0 && px < windowWidth && py >= 0 && py < windowHeight) {
                        const size = (1 - star.z / windowWidth) * 3;
                        renderingContext.beginPath();
                        renderingContext.arc(px, py, size, 0, Math.PI * 2);
                        renderingContext.fill();
                    }
                }

                // Start the next frame of the animation
                requestAnimationFrame(animate);
            } catch (error) {
                // Log any errors that occur during the animation loop
                console.error("Animation error:", error);
            }
        }

        // Start the animation loop
        animate();
    })();
</script>
