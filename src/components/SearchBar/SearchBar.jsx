import styles from "./SearchBar.module.css";

const SearchBar = ({ searchTerm, setSearchTerm, onAddClick }) => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={onAddClick}>Добавить строку</button>
    </div>
  );
};

export default SearchBar;