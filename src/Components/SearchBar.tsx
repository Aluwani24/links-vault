interface SearchProps {
    value: string;
    onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchProps) {
    return (
        <input
            type="search"
            placeholder="Search by title, URL, description..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="search-bar"
        />
    );
}
