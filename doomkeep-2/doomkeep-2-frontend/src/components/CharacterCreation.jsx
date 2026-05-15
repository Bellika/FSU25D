/**
 * CHARACTER CREATION COMPONENT
 *
 * CONCEPTS demonstrated:
 * - Controlled Forms (name input)
 * - State management (selectedClass, name)
 * - Conditional rendering (show different UI based on selected class)
 * - Event handlers (onChange, onClick, onSubmit)
 * - Props (onCreateCharacter callback)
 */

import { useState } from 'react';
import { characterClasses } from '../data/initialData';
import styles from '../styles/CharacterCreation.module.css';

function CharacterCreation({ onCreateCharacter }) {
  // State for name input (controlled input)
  const [name, setName] = useState('');

  // State for selected class
  const [selectedClass, setSelectedClass] = useState(null);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      alert('Please enter a name for your character');
      return;
    }

    if (!selectedClass) {
      alert('Please select a class');
      return;
    }

    // Callback to parent component (GameContainer)
    onCreateCharacter({
      name: name.trim(),
      selectedClass
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        {/* Header */}
        <h1 className={styles.title}>Create Your Hollow</h1>
        <p className={styles.subtitle}>
          In the land of Doomkeep, death is not the end. Choose your path, hollow one.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Name Input */}
          <div className={styles.formGroup}>
            <label htmlFor="characterName" className={styles.label}>
              Character Name
            </label>
            <input
              id="characterName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className={styles.input}
              maxLength={20}
              autoFocus
            />
          </div>

          {/* Class Selection */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Choose Your Class</label>
            <div className={styles.classGrid}>
              {characterClasses.map((charClass) => (
                <div
                  key={charClass.id}
                  className={`${styles.classCard} ${
                    selectedClass?.id === charClass.id ? styles.selected : ''
                  }`}
                  onClick={() => setSelectedClass(charClass)}
                >
                  {/* Class Icon */}
                  <div className={styles.classIcon}>{charClass.icon}</div>

                  {/* Class Name */}
                  <h3 className={styles.className}>{charClass.name}</h3>

                  {/* Class Description */}
                  <p className={styles.classDescription}>
                    {charClass.description}
                  </p>

                  {/* Stats */}
                  <div className={styles.stats}>
                    <div className={styles.statRow}>
                      <span className={styles.statLabel}>Health:</span>
                      <span className={styles.statValue}>
                        {charClass.startingHealth} HP
                      </span>
                    </div>
                    <div className={styles.statRow}>
                      <span className={styles.statLabel}>Weapon:</span>
                      <span className={styles.statValue}>
                        {charClass.startingWeapon.name}
                      </span>
                    </div>
                  </div>

                  {/* Stats breakdown */}
                  <div className={styles.attributes}>
                    <div className={styles.attribute}>
                      <span>STR:</span> {charClass.stats.strength}
                    </div>
                    <div className={styles.attribute}>
                      <span>DEX:</span> {charClass.stats.dexterity}
                    </div>
                    <div className={styles.attribute}>
                      <span>INT:</span> {charClass.stats.intelligence}
                    </div>
                  </div>

                  {/* Selection indicator */}
                  {selectedClass?.id === charClass.id && (
                    <div className={styles.selectedIndicator}>✓ Selected</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.startButton}
            disabled={!name.trim() || !selectedClass}
          >
            Begin Your Journey
          </button>
        </form>

        {/* Footer flavor text */}
        <p className={styles.flavorText}>
          "In the Age of Ancients, the world was unformed..."
        </p>
      </div>
    </div>
  );
}

export default CharacterCreation;
