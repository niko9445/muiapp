import styles from "./Table.module.css";

const Table = ({ rows, selectedRow, onRowClick }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>ID</th>
          <th className={styles.th}>Категория</th>
          <th className={styles.th}>Наименование</th>
          <th className={styles.th}>Серийный номер</th>
          <th className={styles.th}>Ед. изм.</th>
          <th className={styles.th}>Количество</th>
          <th className={styles.th}>Место установки</th>
          <th className={styles.th}>Примечание</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.id}
            className={`${styles.tr} ${
              selectedRow?.id === row.id ? styles.selected : ""
            }`}
            onClick={() => onRowClick(row)}
          >
            <td className={styles.td}>{row.id}</td>
            <td className={styles.td}>{row.category}</td>
            <td className={styles.td}>{row.name}</td>
            <td className={styles.td}>{row.serialNumber}</td>
            <td className={styles.td}>{row.unit}</td>
            <td className={styles.td}>{row.quantity}</td>
            <td className={styles.td}>{row.location}</td>
            <td className={styles.td}>{row.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;