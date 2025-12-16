'use client';

import { UploadButton } from '@/features/upload';
import { cn } from '@/shared/lib';
import { observer } from 'mobx-react-lite';
import styles from './Toolbar.module.css';

const cnToolbar = cn('Toolbar', styles);

/**
 * Main toolbar component with upload controls
 */
export const Toolbar = observer(function Toolbar() {
  return (
    <header className={cnToolbar()}>
      <div className={cnToolbar('Section')}>
        <h1 className={cnToolbar('Title')}>Mini Canvas Studio</h1>
      </div>

      <div className={cnToolbar('Divider')} />

      <div className={cnToolbar('Section')}>
        <UploadButton />
      </div>

      <div className={cnToolbar('Spacer')} />

      <div className={cnToolbar('Section')}>
        <span className={cnToolbar('hint')}>
          Drag images to reposition. Use the layers panel to manage.
        </span>
      </div>
    </header>
  );
});
