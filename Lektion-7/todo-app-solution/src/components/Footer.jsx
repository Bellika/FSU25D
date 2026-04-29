import styles from './Footer.module.css'

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <p>© {currentYear} Todo App - Byggd med React</p>
        </footer>
    )
}

export default Footer
