'use client';

import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '@/shared/ui';
import { Icon } from '@/shared/ui';

/**
 * Upload button component for adding images to the canvas
 *
 * TODO: Implement this component to:
 * 1. Render a hidden file input that accepts images (png, jpg, jpeg, webp)
 * 2. When a file is selected:
 *    - Validate it's an image file
 *    - Create an object URL for the image
 *    - Generate a unique ID (use uuid)
 *    - Create a new Layer object
 *    - Add it to the store via layersStore.addLayer()
 * 3. Handle errors gracefully (invalid file type, etc.)
 *
 */
export const UploadButton = observer(function UploadButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // TODO: Implement file handling
    console.log('File selected:', file.name);

    // Reset input so the same file can be selected again
    event.target.value = '';
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Button variant="primary" onClick={handleClick}>
        <Icon name="upload" size={18} />
        Upload Image
      </Button>
    </>
  );
});
