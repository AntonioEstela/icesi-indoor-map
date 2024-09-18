import { useState, useEffect, MouseEventHandler } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function AutocompleteSearch({
  searchData,
  handleClick,
  handleRemovePath,
  isRouteOn,
}: {
  searchData: Array<string>;
  handleClick: Function;
  handleRemovePath: MouseEventHandler;
  isRouteOn: boolean;
}) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      const filteredSuggestions = searchData.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the search submission here
    console.log('Searching for:', query);
    setShowSuggestions(false);
  };

  return (
    <div className='relative flex justify-between w-full'>
      <form onSubmit={handleSubmit} className='relative w-3/4'>
        <div className='relative shadow-2xl shadow-gray-700'>
          <Input
            type='text'
            placeholder='¿Donde quieres ir?'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='focus-visible:ring-0 focus-visible:ring-offset-0'
          />
          <Button
            type='submit'
            className='absolute top-0 right-0 w-10 h-full px-0 rounded-l-none'
            aria-label='Search'
            onClick={() => {
              handleClick(query);
              setQuery('');
            }}
          >
            <Search className='w-4 h-4' />
          </Button>
        </div>
        {showSuggestions && suggestions.length > 0 && (
          <ul className='absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-md max-h-60'>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className='!px-4 !py-2 cursor-pointer hover:bg-gray-100'
                onClick={() => {
                  setQuery(suggestion);
                  setShowSuggestions(false);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </form>
      {isRouteOn && (
        <Button variant='destructive' onClick={handleRemovePath} className='w-24 shadow-lg shadow-gray-700'>
          Eliminar
        </Button>
      )}
    </div>
  );
}
