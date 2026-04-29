import styles from './Header.module.css'

function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Min Todo App</h1>
            <p className={styles.subtitle}>Håll koll på dina sysslor!</p>
        </header>
    )
}

export default Header
