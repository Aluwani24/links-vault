import type { LinkItem } from '../Components/Utility/Types';
import LinkItemComp from './LinkItem';

interface ListProps {
    links: LinkItem[];
    onEdit: (l: LinkItem) => void;
    onDelete: (id: string) => void;
}

export default function LinkList({ links, onEdit, onDelete }: ListProps) {
    if (!links.length) return <p>Bookmarks not found.</p>;
    return (
        <ul className="link-list">
            {links.map((lnk) => (
                <LinkItemComp
                    key={lnk.id}
                    link={lnk}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}
