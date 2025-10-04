type Event = {
  id: number;
  title: string;
};

const testEvents: Event[] = [
  { id: 1, title: "Warsztaty integracyjne" },
  { id: 2, title: "Sprzątanie parku" },
  { id: 3, title: "Spotkanie organizacyjne" },
  { id: 4, title: "Turniej piłki nożnej" },
];

function SearchBar() {
  const [query, setQuery] = useState("");
  const filteredEvents = testEvents.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-4">
      

      <div className="space-y-2">
        {filteredEvents.length === 0 ? (
          <p className="text-sm text-muted-foreground">Brak wyników</p>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="p-2 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
            >
              <p className="font-medium">{event.title}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchBar