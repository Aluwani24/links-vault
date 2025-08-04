interface TagFilterProps {
    tags: string[];
    selected: string | null;
    onSelect: (tag: string | null) => void;
}

export default function TagFilter({
    tags,
    selected,
    onSelect,
}: TagFilterProps) {
    return (
        <select
            value={selected ?? ''}
            onChange={(e) =>
                onSelect(e.target.value || null)
            }
            className="tag-filter"
        >
            <option value="">All Tags</option>
            {tags.map((t) => (
                <option key={t} value={t}>
                    {t}
                </option>
            ))}
        </select>
    );
}
