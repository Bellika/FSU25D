/**
 * USE HEALTH POT COMPONENT (Lesson 3 - simplified)
 *
 * Simple button to use health potion with useCallback example.
 * Shows charges and disables when no charges or full HP.
 */

import { useCallback } from 'react';
import styles from '../styles/UseHealthPot.module.css';

function UseHealthPot({ charges, maxCharges, currentHP, maxHP, onUse }) {
  const canUse = charges > 0 && currentHP < maxHP;

  // useCallback example - memoize handler
  const handleClick = useCallback(() => {
    if (canUse) {
      onUse();
    }
  }, [canUse, onUse]);

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${!canUse ? styles.disabled : ''}`}
        onClick={handleClick}
        disabled={!canUse}
        title={canUse ? 'Restore 40 HP' : 'Cannot use potion'}
      >
        <span className={styles.icon}>🧪</span>
        <span className={styles.label}>Health Potion</span>
        <span className={styles.charges}>
          {charges}/{maxCharges}
        </span>
      </button>
    </div>
  );
}

export default UseHealthPot;
