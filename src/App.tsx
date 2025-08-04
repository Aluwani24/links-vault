import { useState, useEffect } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid'
import type { LinkItem } from './Components/Utility/Types'
import { getLinks, saveLinks } from './Components/Utility/LocalStorage'
import LinksForm from './Components/LinksForm'
import SearchBar from './Components/SearchBar'
import TagFilter from './Components/TagFilter'
import LinkList from './Components/LinkList'

function App() {

  const [links, setLinks] = useState<LinkItem[]>([])
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [editing, setEditing] = useState<LinkItem | null>(null);

  // Load from localStorage once
  useEffect(() => {
    setLinks(getLinks());
  }, []);

  // Save to localStorage on links change
  useEffect(() => {
    saveLinks(links);
  }, [links]);

  // Add or update a link
  function handleSave(data: Omit<LinkItem, 'id'>) {
    if (editing) {
      setLinks((prev) =>
        prev.map((lnk) =>
          lnk.id === editing.id ? { ...editing, ...data } : lnk
        )
      );
      setEditing(null);
    } else {
      setLinks((prev) => [...prev, { id: uuidv4(), ...data }]);
    }
  }
  // Delete
  function handleDelete(id: string) {
    setLinks((prev) => prev.filter((lnk) => lnk.id !== id));
  }
  // Filter logic
  const filtered = links.filter((lnk) => {
    const matchText =
      lnk.title.includes(searchTerm) ||
      lnk.url.includes(searchTerm) ||
      lnk.description.includes(searchTerm);
    const matchTag = filterTag ? lnk.tags?.includes(filterTag) : true;
    return matchText && matchTag;
  });
  // Gather all tags
  const allTags = Array.from(new Set(links.flatMap((lnk) => lnk.tags)));
  return (
    <div className="container">
      <h1>Links Management System</h1>
      <LinksForm onSave={handleSave} editing={editing} />
      <div className="filters">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <TagFilter
          tags={allTags}
          selected={filterTag}
          onSelect={setFilterTag}
        />
      </div>
      <LinkList
        links={filtered}
        onEdit={(lnk) => setEditing(lnk)}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App

