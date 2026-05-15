/**
 * INVENTORY DISPLAY
 *
 * CONCEPTS:
 * - Lists & Keys (render items)
 * - Props (inventory array)
 * - Conditional rendering (empty state)
 *
 * Displays all items in player's inventory
 */

import styles from '../styles/InventoryDisplay.module.css';

function InventoryDisplay({ inventory }) {
  // Helper: Get icon based on item type
  const getItemIcon = (type) => {
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
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Inventory</h2>

      {inventory.length === 0 ? (
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
