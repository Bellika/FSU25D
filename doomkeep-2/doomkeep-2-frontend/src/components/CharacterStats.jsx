/**
 * CHARACTER STATS
 *
 * CONCEPTS:
 * - Props (character object)
 * - Conditional rendering (health bar color)
 * - Calculated values (health percentage)
 *
 * Displays character's current stats:
 * - Name & Class
 * - Health bar
 * - Level & Souls
 * - Health potion charges
 */

import styles from '../styles/CharacterStats.module.css';

function CharacterStats({ character }) {
  // Calculate health percentage för progress bar
  const healthPercent = (character.health / character.maxHealth) * 100;

  // Determine health bar color based on HP
  const getHealthBarColor = (percent) => {
    if (percent > 60) return styles.healthy;
    if (percent > 30) return styles.warning;
    return styles.critical;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Character</h2>

      {/* Name & Class */}
      <div className={styles.identity}>
        <div className={styles.name}>{character.name}</div>
        <div className={styles.class}>{character.class}</div>
      </div>

      {/* Health Bar */}
      <div className={styles.statGroup}>
        <div className={styles.statLabel}>
          Health
          <span className={styles.statValue}>
            {character.health} / {character.maxHealth}
          </span>
        </div>
        <div className={styles.healthBarContainer}>
          <div
            className={`${styles.healthBar} ${getHealthBarColor(healthPercent)}`}
            style={{ width: `${healthPercent}%` }}
          />
        </div>
      </div>

      {/* Level */}
      <div className={styles.statGroup}>
        <div className={styles.statLabel}>
          Level
          <span className={styles.statValue}>{character.level}</span>
        </div>
      </div>

      {/* Souls */}
      <div className={styles.statGroup}>
        <div className={styles.statLabel}>
          Souls
          <span className={styles.statValue}>{character.souls}</span>
        </div>
      </div>

      {/* Health Potions */}
      <div className={styles.statGroup}>
        <div className={styles.statLabel}>
          Health Potions
          <span className={styles.statValue}>
            {character.healthPotCharges} / {character.maxHealthPotCharges}
          </span>
        </div>
        <div className={styles.healthPotDisplay}>
          {Array.from({ length: character.maxHealthPotCharges }).map((_, i) => (
            <span
              key={i}
              className={`${styles.healthPotIcon} ${
                i < character.healthPotCharges ? styles.full : styles.empty
              }`}
            >
              🍶
            </span>
          ))}
        </div>
      </div>

      {/* Weapon */}
      {character.weapon && (
        <div className={styles.statGroup}>
          <div className={styles.statLabel}>Equipped Weapon</div>
          <div className={styles.weaponName}>{character.weapon.name}</div>
        </div>
      )}
    </div>
  );
}

export default CharacterStats;
