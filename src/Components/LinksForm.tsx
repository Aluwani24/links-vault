import { useState, useEffect, type FormEvent } from 'react';
import type { LinkItem } from '../Components/Utility/Types';

interface FormProps {
  onSave: (data: Omit<LinkItem, 'id'>) => void;
  editing: LinkItem | null;
}

export default function LinkForm({ onSave, editing }: FormProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setUrl(editing.url);
      setDescription(editing.description);
      setTags(editing.tags.join(','));
    }
  }, [editing]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSave({
      title,
      url,
      description,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
    setTitle('');
    setUrl('');
    setDescription('');
    setTags('');
  }

  return (
    <form className="link-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button type="submit">{editing ? 'Update' : 'Add'} Link</button>
    </form>
  );
}

