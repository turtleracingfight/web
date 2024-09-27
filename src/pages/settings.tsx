import styles from '../styles/settings.module.scss'

export const Settings = () => {
    return <div className={styles.container}>
        <details name="pets" id="pet-select">
            <option value="">Выберите язык</option>
        </details>
    </div>
}