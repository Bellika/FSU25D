/**
 * INVENTORY DISPLAY
 *
 * CONCEPTS (Lesson 3):
 * - useMemo: Calculate derived values (item counts) only when inventory changes
 * - useCallback: Memoize helper functions to prevent recreating on every render
 * - Lists & Keys (render items)
 * - Props (inventory array)
 * - Conditional rendering (empty state)
 *
 * Displays all items in player's inventory
 */

import { useMemo, useCallback } from 'react';
import styles from '../styles/InventoryDisplay.module.css';

function InventoryDisplay({ inventory }) {
  /**
   * useCallback: Memoize helper function
   *
   * This function doesn't actually need useCallback since it's not passed
   * to child components, but it demonstrates the concept.
   *
   * In a real scenario, if this was passed as a prop to an optimized
   * child component (using React.memo), useCallback would prevent
   * unnecessary re-renders.
   */
  const getItemIcon = useCallback((type) => {
    switch (type) {
      case 'weapon':
        return '⚔️';
      case 'key':
        return '🔑';
      case 'consumable':
        return '🍶';
      case 'upgrade':
        return '✨';
      case 'lore':
        return '📜';
      default:
        return '📦';
    }
  }, []); // Empty deps = function never changes

  /**
   * useMemo: Calculate derived state
   *
   * This calculates item counts by type. Without useMemo, this would
   * recalculate on EVERY render, even if inventory hasn't changed.
   *
   * With useMemo, it only recalculates when inventory changes.
   *
   * This is an example of optimizing "expensive" calculations.
   */
  const itemCounts = useMemo(() => {
    const counts = {
      weapon: 0,
      key: 0,
      consumable: 0,
      lore: 0,
      upgrade: 0
    };

    inventory.forEach(item => {
      if (item.type in counts) {
        counts[item.type]++;
      }
    });

    console.log('📊 Recalculated item counts:', counts);
    return counts;
  }, [inventory]); // Only recalculate when inventory array changes

  /**
   * useMemo: Calculate total item count
   *
   * Simple example of derived state optimization.
   */
  const totalItems = useMemo(() => {
    return inventory.length;
  }, [inventory]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Inventory ({totalItems}/15)
      </h2>

      {/* Show item type counts */}
      {totalItems > 0 && (
        <div className={styles.itemCounts}>
          {itemCounts.weapon > 0 && <span>⚔️ {itemCounts.weapon}</span>}
          {itemCounts.key > 0 && <span>🔑 {itemCounts.key}</span>}
          {itemCounts.consumable > 0 && <span>🍶 {itemCounts.consumable}</span>}
          {itemCounts.lore > 0 && <span>📜 {itemCounts.lore}</span>}
        </div>
      )}

      {totalItems === 0 ? (
        <div className={styles.emptyState}>
          <p>No items</p>
        </div>
      ) : (
        <div className={styles.itemGrid}>
          {inventory.map((item) => (
            <div key={item.id} className={styles.itemCard} title={item.description}>
              <div className={styles.itemIcon}>{getItemIcon(item.type)}</div>
              <div className={styles.itemName}>{item.name}</div>
              {item.quality && (
                <div className={styles.itemQuality}>Quality: {item.quality}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InventoryDisplay;
