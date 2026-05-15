/**
 * CHOICE BUTTONS
 *
 * CONCEPTS:
 * - Lists & Keys (render choices)
 * - Event handlers (onClick with index)
 * - Props (choices, onChoice callback)
 * - Conditional styling based on choice type
 *
 * Displays all available choices for the player
 */

import styles from '../styles/ChoiceButtons.module.css';

function ChoiceButtons({ choices, onChoice }) {
  // Helper: Get icon based on choice type
  const getChoiceIcon = (type) => {
    switch (type) {
      case 'combat':
        return '⚔️';
      case 'explore':
        return '🚪';
      case 'rest':
      case 'bonfire':
        return '🔥';
      case 'dialogue':
        return '💬';
      case 'stealth':
        return '🌑';
      default:
        return '➤';
    }
  };

  // Helper: Get button style based on type
  const getChoiceClass = (type) => {
    return `${styles.choiceButton} ${styles[type] || ''}`;
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>What will you do?</h3>
      <div className={styles.choicesGrid}>
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => onChoice(index)}
            className={getChoiceClass(choice.type)}
          >
            <span className={styles.icon}>{getChoiceIcon(choice.type)}</span>
            <span className={styles.text}>{choice.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ChoiceButtons;
