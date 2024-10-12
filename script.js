document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const image = document.getElementById('image');
    const brightness = document.getElementById('brightness');
    const contrast = document.getElementById('contrast');
    const blur = document.getElementById('blur');
    const opacity = document.getElementById('opacity');
    const hue = document.getElementById('hue');
    const saturation = document.getElementById('saturation');
    const sepia = document.getElementById('sepia');
    const grayscale = document.getElementById('grayscale');
    const invert = document.getElementById('invert');
    const autoEditButton = document.getElementById('autoEdit');
    const resetButton = document.getElementById('reset');
    const downloadButton = document.getElementById('download');

    // Load Image
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                image.src = e.target.result;
                applyFilters();
            };
            reader.readAsDataURL(file);
        }
    });

    // Apply Filters
    function applyFilters() {
        if (image.src) {
            const filter = `
                brightness(${brightness.value}%)
                contrast(${contrast.value}%)
                blur(${blur.value}px)
                hue-rotate(${hue.value}deg)
                saturate(${saturation.value}%)
                sepia(${sepia.value}%)
                grayscale(${grayscale.value}%)
                invert(${invert.value}%)
            `;
            image.style.filter = filter;
            image.style.opacity = opacity.value / 100;
        }
    }

    // Event Listeners for Controls
    brightness.addEventListener('input', applyFilters);
    contrast.addEventListener('input', applyFilters);
    blur.addEventListener('input', applyFilters);
    opacity.addEventListener('input', applyFilters);
    hue.addEventListener('input', applyFilters);
    saturation.addEventListener('input', applyFilters);
    sepia.addEventListener('input', applyFilters);
    grayscale.addEventListener('input', applyFilters);
    invert.addEventListener('input', applyFilters);

    // Auto Edit
    autoEditButton.addEventListener('click', () => {
        alert("This function is not working correctly. We will work on it, but for now, you can please edit manually.");
        brightness.value = 120;
        contrast.value = 110;
        blur.value = 5;
        opacity.value = 90;
        hue.value = 180;
        saturation.value = 150;
        sepia.value = 20;
        grayscale.value = 30;
        invert.value = 20;
        applyFilters();
    });

    // Reset Filters
    resetButton.addEventListener('click', () => {
        brightness.value = 100;
        contrast.value = 100;
        blur.value = 0;
        opacity.value = 100;
        hue.value = 0;
        saturation.value = 100;
        sepia.value = 0;
        grayscale.value = 0;
        invert.value = 0;
        applyFilters();
    });

    // Download Edited Image
    downloadButton.addEventListener('click', () => {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions to match the image
        canvas.width = image.width;
        canvas.height = image.height;

        // Apply filters to canvas
        ctx.filter = `
            brightness(${brightness.value}%)
            contrast(${contrast.value}%)
            blur(${blur.value}px)
            hue-rotate(${hue.value}deg)
            saturate(${saturation.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value}%)
            invert(${invert.value}%)
        `;
        ctx.globalAlpha = opacity.value / 100;

        // Draw the image onto the canvas
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Generate downloadable image
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'edited-image.png';
        link.click();
    });
});
