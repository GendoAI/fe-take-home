'use client';

import { observer } from 'mobx-react-lite';
import { cn } from '@/shared/lib';
import { UploadButton } from './UploadButton';
import styles from './toolbar.module.css';

const cnToolbar = cn('Toolbar', styles);

/**
 * Main toolbar component with upload controls
 */
export const Toolbar = observer(function Toolbar() {
  return (
    <header className={cnToolbar()}>
      <div className={cnToolbar('section')}>
        <h1 className={cnToolbar('title')}>Mini Canvas Studio</h1>
      </div>

      <div className={cnToolbar('divider')} />

      <div className={cnToolbar('section')}>
        <UploadButton />
      </div>

      <div className={cnToolbar('spacer')} />

      <div className={cnToolbar('section')}>
        <span className={cnToolbar('hint')}>
          Drag images to reposition. Use the layers panel to manage.
        </span>
      </div>
    </header>
  );
});
