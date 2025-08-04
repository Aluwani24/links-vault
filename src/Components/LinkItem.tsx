import type { LinkItem } from '../Components/Utility/Types';

interface ItemProps {
  link: LinkItem;
  onEdit: (l: LinkItem) => void;
  onDelete: (id: string) => void;
}

export default function LinkItemComp({ link, onEdit, onDelete }: ItemProps) {
  return (
    <li className="link-item">
      <h3>{link.title}</h3>
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        {link.url}
      </a>
      <p>{link.description}</p>
      <div className="tags">
        {link.tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
      <div className="actions">
        <button onClick={() => onEdit(link)}>Edit</button>
        <button onClick={() => onDelete(link.id)}>Delete</button>
      </div>
    </li>
  );
}
